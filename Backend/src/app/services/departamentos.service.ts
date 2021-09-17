import { DeepPartial, getRepository } from "typeorm";
import { Departamento } from "../models/departamento.model";
import { Pais } from "../models/pais.model";

/* ---------------------------------------< DEPARTAMENTOS SERVICE >--------------------------------------- */

// Retorna todos los Departamentos almacenados en el sistema.
export const get = async (): Promise<Departamento[]> => {
    return await getRepository(Departamento).find();
};

// Retorna el Departamento almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Departamento | undefined> => {
    return await getRepository(Departamento).findOne(id, { relations: ["pais"] });
};

// Retorna los Departamentos almacenado en el sistema cuyo pais sea el ingresado.
export const getByPais = async (pais: Pais): Promise<Departamento[]> => {
    return await getRepository(Departamento).find({
        where: { pais },
        relations: ["pais"]
    });
};

// Almacena en el sistema un nuevo Departamento.
export const post = async (data: DeepPartial<Departamento>): Promise<Departamento> => {
    const nuevoDepartamento = getRepository(Departamento).create(data);

    return await getRepository(Departamento).save(nuevoDepartamento);
};

// Actualiza un Departamento almacenado en el sistema.
export const put = async (id: number, data: DeepPartial<Departamento>): Promise<void> => {
    data.id = id;
    await getRepository(Departamento).save(data);
};