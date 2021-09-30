import { DeepPartial, getRepository } from "typeorm";
import { Novedad } from "../models/novedad.model";

/* ---------------------------------------< NOVEDADES SERVICE >--------------------------------------- */

// Retorna todas las Novedades almacenados en el sistema.
export const get = async (skip?: number, take?: number): Promise<{ novedades: Novedad[], cantidad: number }> => {
    const result = await getRepository(Novedad).findAndCount({
        skip, take, order: { fechaPublicacion: "DESC" }
    });

    return { novedades: result[0], cantidad: result[1] };
};

// Retorna la Novedad almacenada en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Novedad | undefined> => {
    return await getRepository(Novedad).findOne(id);
};

// Almacena en el sistema una nueva Novedad.
export const post = async (data: DeepPartial<Novedad>): Promise<Novedad> => {
    const nuevaNovedad = getRepository(Novedad).create(data);
    return await getRepository(Novedad).save(nuevaNovedad);
};

// Actualiza una Novedad almacenada en el sistema.
export const put = async (id: number, data: DeepPartial<Novedad>): Promise<void> => {
    data.id = id;
    await getRepository(Novedad).save(data);
};

// Elimina una Novedad almacenada en el sistema.
export const _delete = async (id: number): Promise<void> => {
    await getRepository(Novedad).delete(id);
};