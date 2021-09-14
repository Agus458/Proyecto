import { DeepPartial, getRepository } from "typeorm";
import { Administrador } from "../models/administrador.model";

/* ---------------------------------------< ADMINISTRADORES SERVICE >--------------------------------------- */

// Retorna todos los Administradores almacenados en el sistema.
export const get = async (): Promise<Administrador[]> => {
    return await getRepository(Administrador).find();
};

// Retorna el Administrador almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Administrador | undefined> => {
    return await getRepository(Administrador).findOne(id);
};

// Retorna el Administrador almacenado en el sistema cuyo email sea el ingresado.
export const getByEmail = async (email: string): Promise<Administrador | undefined> => {
    return await getRepository(Administrador).findOne({
        where: { email }
    });
};

// Almacena en el sistema un nuevo Administrador.
export const post = async (data: DeepPartial<Administrador>): Promise<Administrador> => {
    const nuevoAdministrador = getRepository(Administrador).create(data);

    return await getRepository(Administrador).save(nuevoAdministrador);
};

// Actualiza un Administrador almacenado en el sistema.
export const put = async (id: number, data: DeepPartial<Administrador>): Promise<void> => {
    await getRepository(Administrador).update(id, data);
};