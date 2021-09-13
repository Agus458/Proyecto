import { createConnection } from "typeorm";
import { onInit } from "./init.config";

/* ---------------------------------------< DATABASE CONFIGURATION >--------------------------------------- */

export const connect = async () => {
    await createConnection().then(() => {
        console.log("Base de Datos Conectada");
    }).catch(error => {
        console.log(error);
    });

    await onInit();
}