import { ConnectionOptions } from "typeorm";

export const testConnection: ConnectionOptions[] = [
    {
        name: 'default',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'tisj',
        database: 'tests',
        dropSchema: true,
        logging: false,
        synchronize: true,
        entities: [
            "dist/app/models/**/*.js"
        ]
    }
]