import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { getConfig } from './load-config';
import { IConfig } from './interfaces/config';


const YAML_CONFIG_FILENAME = '.config.yaml';

@Injectable()
export class ConfigService {
    private _config: IConfig;
    constructor(){
        console.log('Init config');
        this._config = getConfig();
    }

    get databases(){ return this._config.databases; }
}