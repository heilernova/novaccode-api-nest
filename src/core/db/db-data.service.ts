import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ConnectionsService } from './connections.service';
@Injectable()
export class DBDataService {
    public readonly client: Pool
    constructor(
        private readonly _connections: ConnectionsService
    ){
        this.client = this._connections.data;
    }

    async insert(values: { [field: string]: any }, table: string, returning: string = '*'){
        let entries = Object.entries(values);
        let sqlfields: string = '';
        let sqlValues: string = '';
        let params: any[] = [];
        let sql: string = '';

        entries.filter(x => x[1] !== undefined).forEach((entri, index) => {
            sqlfields = `${sqlfields}, ${entri[0]}`;
            sqlValues = `${sqlValues}, $${index + 1}`;
            params.push(Array.isArray(entri[1]) ? JSON.stringify(entri[1]) : entri[1]);
        });

        sql = `insert into ${table}(${sqlfields.substring(2)}) values(${sqlValues.substring(2)})${returning ? ` returning ${returning}` : ''}`;
        return (await this.client.query(sql, params));
    }

    async update(values: { [field: string]: any}, table: string, where: { condition: string, params?: any[] }, returnnig: string = '*'){
        let entries = Object.entries(values);
        let sqlfields: string = '';
        let sqlValues: string = '';
        let params: any[] = [];
        let sql: string = '';
        let index: number = 0;
        let sets = '';
        let condition = "";

        entries.filter(x => x[1] !== undefined).forEach((entri, index) => {
            sets = `${sets}, ${entri[0]} = $${index + 1}`;
            params.push(Array.isArray(entri[1]) ? JSON.stringify(entri[1]) : entri[1]);
        });

        

        sql = `update from ${table} ${sets.substring(2)} where `;

        return sql;
    }
}