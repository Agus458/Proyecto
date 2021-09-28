import { DeepPartial, getRepository } from "typeorm";
import { PreferenciaLaboral } from "../models/preferenciaLaboral.model";

/* ---------------------------------------< PreferenciaLaboralS SERVICE >--------------------------------------- */

// Retorna todas los Preferencias Laborales almacenados en el sistema.
export const get = async (): Promise<PreferenciaLaboral[]> => {
    return await getRepository(PreferenciaLaboral).find();
};

// Retorna la Preferencia Laboral almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<PreferenciaLaboral | undefined> => {
    return await getRepository(PreferenciaLaboral).findOne(id, { relations: ["postulante"] });
};

// Crea una nueva Preferencia Laboral sin persistirla.
export const create = (data: DeepPartial<PreferenciaLaboral>[]): PreferenciaLaboral[] => {
    return getRepository(PreferenciaLaboral).create(data);
};

// Almacena en el sistema una nueva Preferencia Laboral.
export const post = async (data: DeepPartial<PreferenciaLaboral>): Promise<PreferenciaLaboral> => {
    const nuevoPreferenciaLaboral = getRepository(PreferenciaLaboral).create(data);

    return await getRepository(PreferenciaLaboral).save(nuevoPreferenciaLaboral);
};

// Actualiza una Preferencia Laboral almacenada en el sistema.
export const put = async (id: number, data: DeepPartial<PreferenciaLaboral>): Promise<void> => {
    data.id = id;
    await getRepository(PreferenciaLaboral).save(data);
};

// Elimina una Preferencia Laboral almacenada en el sistema.
export const _delete = async (id: number): Promise<void> => {
    await getRepository(PreferenciaLaboral).delete(id);
};