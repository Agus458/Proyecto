import { DeepPartial,getRepository } from "typeorm";
import { Offerta } from "../models/offerta.model";


export const get = async (): Promise<Offerta[]> => {
    return await getRepository(Offerta).find();
};

export const getById = async (id: number): Promise<Offerta | undefined> => {
    return await getRepository(Offerta).findOne(id);
};
/*
export const getByNombreEmpresa = async (nombreEmpresa: string): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{ nombreEmpresa}
    });
};
*/
/*
export const getByRut = async (Rut: string): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{ Rut}
    });
};
*/
export const post = async(data: DeepPartial<Offerta>): Promise<Offerta>=>{
    const nuevaOfferta = getRepository(Offerta).create(data);
    return await getRepository(Offerta).save(nuevaOfferta);
}

export const put = async (id: number, data:DeepPartial<Offerta>): Promise<void> =>{
    data.id = id;
    await getRepository(Offerta).save(data);
};



