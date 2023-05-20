import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ConfigService } from 'src/core/config';
import { isUUID } from 'class-validator'
import { IsUUIDPipe } from 'src/http/params/is-uuid.pipe';

@Controller()
export class PersonsController {
  constructor(
    private readonly _personsService: PersonsService,
    private readonly config: ConfigService
  ) {}

  @Get('balance')
  async balance(){
    throw new HttpException('Sin acces', 401);
    return  await this._personsService.getInfo();
  }

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {

    // Verificamos que el dni no este registrado
    let exits:boolean = await this._personsService.dniExists(createPersonDto.dni);

    // return exits;

    if (exits){
      throw new HttpException('El Numero de documento ya esta registrado', 400);
    }

    // return createPersonDto;
    return this._personsService.create(createPersonDto);
  }

  @Get()
  async findAll(@Query() params: any) {
    return this._personsService.findAll(params);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this._personsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', IsUUIDPipe) id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this._personsService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id', IsUUIDPipe) id: string) {
    
    return this._personsService.remove(id);
  }
}
