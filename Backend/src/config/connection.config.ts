import { ConnectionOptions, createConnections, getConnection } from "typeorm";
import { onInit } from "./init.config";

/* ---------------------------------------< DATABASE CONFIGURATION >--------------------------------------- */

const connection = {
    async create(options?: ConnectionOptions[]) {
        await createConnections(options).then(async () => {
            await onInit();

            console.log("Base de Datos Conectada");
        }).catch(e => console.log(e));
    },

    async close() {
        await getConnection().close();
    },
};

export default connection;