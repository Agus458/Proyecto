import { ConnectionOptions, createConnections, getConnection } from "typeorm";
import { onInit } from "./init.config";
import { testConnection } from "./test.connection.config";

/* ---------------------------------------< DATABASE CONFIGURATION >--------------------------------------- */

const connection = {
    async create(options?: ConnectionOptions[]) {
        await createConnections(options).then(async () => {
            await onInit();

            console.log("Base de Datos Conectada");
        }).catch(e => console.log(e));
    },

    isTest() {
        if (process.env.ENV == "test") return testConnection;
    }
};

export default connection;