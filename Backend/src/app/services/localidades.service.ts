import { DeepPartial, getRepository } from "typeorm";
import { Departamento } from "../models/departamento.model";
import { Localidad } from "../models/localidad.model";

/* ---------------------------------------< LOCALIDADES SERVICE >--------------------------------------- */

// Retorna todos los Localidades almacenados en el sistema.
export const get = async (): Promise<Localidad[]> => {
    return await getRepository(Localidad).find();
};

// Retorna el Localidad almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Localidad | undefined> => {
    return await getRepository(Localidad).findOne(id);
};

// Retorna los Localidads almacenado en el sistema cuyo Departamento sea el ingresado.
export const getByDepartamento = async (departamento: Departamento): Promise<Localidad[]> => {
    return await getRepository(Localidad).find({
        where: { departamento }
    });
};

// Almacena en el sistema un nuevo Localidad.
export const post = async (data: DeepPartial<Localidad>): Promise<Localidad> => {
    const nuevoLocalidad = getRepository(Localidad).create(data);

    return await getRepository(Localidad).save(nuevoLocalidad);
};

// Actualiza un Localidad almacenado en el sistema.
export const put = async (id: number, data: DeepPartial<Localidad>): Promise<void> => {
    await getRepository(Departamento).update(id, data);
};