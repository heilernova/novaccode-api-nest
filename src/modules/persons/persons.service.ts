import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DBDataService } from 'src/core/db';

@Injectable()
export class PersonsService {

  constructor(
    private readonly _db: DBDataService
  ){}

  async getInfo(){
    let sql: string = 'select (select count(*) from tb_persons)::int as total, (SELECT count(*) FROM (  SELECT  *, COUNT(*) OVER(PARTITION BY dni) N FROM tb_persons) as A WHERE N > 1)::int as duplicates;';
    return (await this._db.client.query(sql)).rows[0];
  }


  async create(createPersonDto: CreatePersonDto) {
    return await this._db.insert(createPersonDto, 'tb_persons');
  }

  async findAll(query: { dni?: string, name?: string, last_name?: string, sex: 'M' | 'F' }) {
    let condition: string  = '';
    let params: string[] = [];
    let sql: string = '';
  
    if (query.dni && !query.name && !query.last_name && !query.sex){
      condition = 'dni = $1';
      params.push(query.dni);
    } else if ((query.name || query.last_name) && !query.dni  && !query.sex) {
      if (query.name && query.last_name){
        condition = 'name ilike $1 and last_name ilike $2';
        params.push(... [`%${query.name}%`, `%${query.last_name}%`]);
      } else if (query.name) {
        condition = 'name ilike $1';
        params.push(`%${query.name}%`);
      } else {
        condition = `last_name ilike $1`;
        params.push(`%${query.last_name}%`);
      }
    }

    sql = `select * from vi_persons where ${condition}`;

    return (await this._db.client.query(sql, params)).rows;
  }

  async dniExists(dni: string){
    let result = await this._db.client.query('select count(*)::int as result from tb_persons where dni = $1', [dni]);
    return result.rows[0].result > 0;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    return await this._db.update(updatePersonDto, 'tb_persons', { condition: 'id = ?', params: [id] });
  }

  async remove(id: string) {
    let result = await this._db.client.query('delete from tb_persons where id = $1', [id]);
    return result.rowCount > 0;
  }
}
