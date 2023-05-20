import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '../config';
@Injectable()
export class ConnectionsService {

    public readonly data: Pool;

    constructor(
        private readonly _config: ConfigService
    ){
        let dataConncetion = this._config.databases.postgres.data
        this.data = new Pool(dataConncetion);
    }
}