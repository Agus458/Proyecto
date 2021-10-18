import { DeepPartial, getRepository } from "typeorm";
import { Oferta } from "../models/oferta.model";

export const get = async (): Promise<Oferta[]> => {
    return await getRepository(Oferta).find();
};

export const getById = async (id: number): Promise<Oferta | undefined> => {
    return await getRepository(Oferta).findOne(id);
};

export const post = async(data: DeepPartial<Oferta>): Promise<Oferta>=>{
    const nuevaOferta = getRepository(Oferta).create(data);
    return await getRepository(Oferta).save(nuevaOferta);
}

export const put = async (id: number, data:DeepPartial<Oferta>): Promise<void> =>{
    data.id = id;
    await getRepository(Oferta).save(data);
};

export const _delete = async (id: number): Promise<void> =>{
    await getRepository(Oferta).delete(id);
};