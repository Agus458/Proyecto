import { DeepPartial,getRepository } from "typeorm";
import { Novedad } from "../models/novedad.model";
import { Offerta } from "../models/offera.model";

export const get = async (): Promise<Offerta[]> => {
    return await getRepository(Offerta).find();
};

export const getById = async (id: number): Promise<Offerta | undefined> => {
    return await getRepository(Offerta).findOne(id);
};