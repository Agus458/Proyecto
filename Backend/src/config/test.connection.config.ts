import { ConnectionOptions } from "typeorm";

export const testConnection: ConnectionOptions[] = [
    {
        name: 'default',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'tests',
        dropSchema: true,
        logging: false,
        synchronize: true,
        entities: [
            "dist/app/models/**/*.js",
            "src/app/models/**/*.ts",
        ]
    }
]