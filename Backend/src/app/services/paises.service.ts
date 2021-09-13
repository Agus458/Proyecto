import { DeepPartial, getRepository } from "typeorm";
import { Pais } from "../models/pais.model";

/* ---------------------------------------< PAISES SERVICE >--------------------------------------- */

// Retorna todos los Paises almacenados en el sistema.
export const get = async (): Promise<Pais[]> => {
    return await getRepository(Pais).find();
};

// Retorna el Pais almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Pais | undefined> => {
    return await getRepository(Pais).findOne(id);
};

// Almacena en el sistema un nuevo Pais.
export const post = async (data: DeepPartial<Pais>): Promise<Pais> => {
    const nuevoPais = getRepository(Pais).create(data);

    return await getRepository(Pais).save(nuevoPais);
};

// Actualiza un Pais almacenado en el sistema.
export const put = async (id: number, data: DeepPartial<Pais>): Promise<void> => {
    await getRepository(Pais).update(id, data);
};