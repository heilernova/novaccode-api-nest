export interface IConfig {
    debug?: boolean,
    http: {
        host: string,
        port: number
    },
    databases: {
        postgres: {
            data: IPostgresDataConnection
        } 
    }
}

export interface IPostgresDataConnection {
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
}