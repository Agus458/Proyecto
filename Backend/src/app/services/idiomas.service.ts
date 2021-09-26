import { DeepPartial, getRepository } from "typeorm";
import { Idioma } from "../models/Idioma.Model";

/* ---------------------------------------< IDIOMAS SERVICE >--------------------------------------- */

// Retorna todas los Idiomas almacenados en el sistema.
export const get = async (): Promise<Idioma[]> => {
    return await getRepository(Idioma).find();
};

// Retorna el Idioma almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Idioma | undefined> => {
    return await getRepository(Idioma).findOne(id, { relations: ["postulante"] });
};

// Crea una nuevo Idioma sin persistirlo.
export const create = (data: DeepPartial<Idioma>[]): Idioma[] => {
    return getRepository(Idioma).create(data);
};

// Almacena en el sistema una nuevo Idioma.
export const post = async (data: DeepPartial<Idioma>): Promise<Idioma> => {
    const nuevoIdioma = getRepository(Idioma).create(data);

    return await getRepository(Idioma).save(nuevoIdioma);
};

// Actualiza un Idioma almacenado en el sistema.
export const put = async (id: number, data: DeepPartial<Idioma>): Promise<void> => {
    await getRepository(Idioma).save(data);
};