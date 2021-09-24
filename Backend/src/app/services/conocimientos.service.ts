import { DeepPartial, getRepository } from "typeorm";
import { ConocimientoInformatico } from "../models/conocimiento-informatico.model";

/* ---------------------------------------< CONOCIMIENTOS INFORMATICOS SERVICE >--------------------------------------- */

// Retorna todas los Conocimientos Informaticos almacenados en el sistema.
export const get = async (): Promise<ConocimientoInformatico[]> => {
    return await getRepository(ConocimientoInformatico).find();
};

// Retorna el Conocimiento Informatico almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<ConocimientoInformatico | undefined> => {
    return await getRepository(ConocimientoInformatico).findOne(id, { relations: ["postulante"] });
};

// Crea una nuevo Conocimiento Informatico sin persistirlo.
export const create = (data: DeepPartial<ConocimientoInformatico>[]): ConocimientoInformatico[] => {
    return getRepository(ConocimientoInformatico).create(data);
};

// Almacena en el sistema una nuevo Conocimiento Informatico.
export const post = async (data: DeepPartial<ConocimientoInformatico>): Promise<ConocimientoInformatico> => {
    const nuevoConocimientoInformatico = getRepository(ConocimientoInformatico).create(data);

    return await getRepository(ConocimientoInformatico).save(nuevoConocimientoInformatico);
};

// Actualiza un Conocimiento Informatico almacenado en el sistema.
export const put = async (id: number, data: DeepPartial<ConocimientoInformatico>): Promise<void> => {
    data.id = id;
    await getRepository(ConocimientoInformatico).save(data);
};