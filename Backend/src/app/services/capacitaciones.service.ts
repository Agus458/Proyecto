import { DeepPartial, getRepository } from "typeorm";
import { Capacitacion } from "../models/capacitacion.model";

/* ---------------------------------------< CAPACITACIONES SERVICE >--------------------------------------- */

// Retorna todas las Capacitacion almacenados en el sistema.
export const get = async (): Promise<Capacitacion[]> => {
    return await getRepository(Capacitacion).find();
};

// Retorna el Capacitacion almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Capacitacion | undefined> => {
    return await getRepository(Capacitacion).findOne(id, { relations: ["postulante"] });
};

// Crea una nueva Capacitacion sin persistirla.
export const create = (data: DeepPartial<Capacitacion>[]): Capacitacion[] => {
    return getRepository(Capacitacion).create(data);
};

// Almacena en el sistema una nueva Capacitacion.
export const post = async (data: DeepPartial<Capacitacion>): Promise<Capacitacion> => {
    const nuevoCapacitacion = getRepository(Capacitacion).create(data);

    return await getRepository(Capacitacion).save(nuevoCapacitacion);
};

// Actualiza una Capacitacion almacenada en el sistema.
export const put = async (id: number, data: DeepPartial<Capacitacion>): Promise<void> => {
    data.id = id;
    await getRepository(Capacitacion).save(data);
};