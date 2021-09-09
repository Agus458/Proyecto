import { createConnection } from "typeorm";

/* ---------------------------------------< DATABASE CONFIGURATION >--------------------------------------- */

export const connect = async () => {
    createConnection().then(() => {

        console.log("Base de Datos Conectada");

    }).catch(error => {
        console.log(error);
    });
}