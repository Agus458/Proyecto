import { DeepPartial, getRepository } from "typeorm";
import { Postulante } from "../models/postulante.model";

/* ---------------------------------------< POSTULANTES SERVICE >--------------------------------------- */

// Retorna todos los postulantes almacenados en el sistema.
export const get = async (): Promise<Postulante[]> => {
    return await getRepository(Postulante).find();
};

// Retorna el postulante almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Postulante | undefined> => {
    return await getRepository(Postulante).findOne(id);
};

// Retorna el postulante almacenado en el sistema cuyo email sea el ingresado.
export const getByEmail = async (email: string): Promise<Postulante | undefined> => {
    return await getRepository(Postulante).findOne({
        where: { email }
    });
};



// Almacena en el sistema un nuevo postulante.
export const post = async (data: DeepPartial<Postulante>): Promise<Postulante> => {
    const nuevoPostulante = getRepository(Postulante).create(data);

    return await getRepository(Postulante).save(nuevoPostulante);
};

// Almacena en el sistema un nuevo postulante.
export const put = async (id: number, data: DeepPartial<Postulante>): Promise<void> => {
    await getRepository(Postulante).update(id, data);
};