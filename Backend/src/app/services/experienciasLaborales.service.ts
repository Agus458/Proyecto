import { DeepPartial, getRepository } from "typeorm";
import { ExperienciaLaboral } from "../models/experiencia-laboral.model";

/* ---------------------------------------< ExperienciaLaboralS SERVICE >--------------------------------------- */

// Retorna todas los Experiencias Laborales almacenados en el sistema.
export const get = async (): Promise<ExperienciaLaboral[]> => {
    return await getRepository(ExperienciaLaboral).find();
};

// Retorna la Experiencia Laboral almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<ExperienciaLaboral | undefined> => {
    return await getRepository(ExperienciaLaboral).findOne(id, { relations: ["postulante"] });
};

// Crea una nueva Experiencia Laboral sin persistirlo.
export const create = (data: DeepPartial<ExperienciaLaboral>[]): ExperienciaLaboral[] => {
    return getRepository(ExperienciaLaboral).create(data);
};

// Almacena en el sistema una nueva Experiencia Laboral.
export const post = async (data: DeepPartial<ExperienciaLaboral>): Promise<ExperienciaLaboral> => {
    const nuevoExperienciaLaboral = getRepository(ExperienciaLaboral).create(data);

    return await getRepository(ExperienciaLaboral).save(nuevoExperienciaLaboral);
};

// Actualiza una Experiencia Laboral almacenado en el sistema.
export const put = async (id: number, data: DeepPartial<ExperienciaLaboral>): Promise<void> => {
    data.id = id;
    await getRepository(ExperienciaLaboral).save(data);
};