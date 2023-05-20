import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { IConfig } from './interfaces/config';


const YAML_CONFIG_FILENAME = '.config.yaml';


const loadConfig = () => {
    const config = (yaml.load( readFileSync(join(YAML_CONFIG_FILENAME), 'utf8')) as IConfig);
    return config;
}

export const APP_CONFIG: IConfig =  loadConfig();


export const getConfig = () => APP_CONFIG;