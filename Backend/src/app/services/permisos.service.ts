import { DeepPartial, getRepository } from "typeorm";
import { Permiso } from "../models/permiso.model";

/* ---------------------------------------< PermisoS SERVICE >--------------------------------------- */

// Retorna todas los Permisos almacenados en el sistema.
export const get = async (): Promise<Permiso[]> => {
    return await getRepository(Permiso).find();
};

// Retorna el Permiso almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Permiso | undefined> => {
    return await getRepository(Permiso).findOne(id, { relations: ["postulante"] });
};

// Crea una nuevo Permiso sin persistirlo.
export const create = (data: DeepPartial<Permiso>[]): Permiso[] => {
    return getRepository(Permiso).create(data);
};

// Almacena en el sistema una nuevo Permiso.
export const post = async (data: DeepPartial<Permiso>): Promise<Permiso> => {
    const nuevoPermiso = getRepository(Permiso).create(data);

    return await getRepository(Permiso).save(nuevoPermiso);
};

// Actualiza un Permiso almacenado en el sistema.
export const put = async (id: number, data: DeepPartial<Permiso>): Promise<void> => {
    data.id = id;
    await getRepository(Permiso).save(data);
};

// Elimina un Permiso almacenada en el sistema.
export const _delete = async (id: number): Promise<void> => {
    await getRepository(Permiso).delete(id);
};