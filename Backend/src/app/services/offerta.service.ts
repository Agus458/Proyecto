//import { Request,Response } from "express";
//import * as
import { DeepPartial,getRepository } from "typeorm";
import { Offerta} from "../models/offerta.model";

export const get = async(): Promise<Offerta[]> =>{
return await getRepository(Offerta).find();
};

export const getById = async(id:number):Promise<Offerta | undefined>=>{
    console.log(id);

    return await getRepository(Offerta).findOne(id);
}



export const getByNameEnterprise = async(nombreEmpresa:string): Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where: {nombreEmpresa}
    });
}

//export const getByPuesto = async(nombre)



export const post = async (data: DeepPartial<Offerta>): Promise<Offerta> => {
    const nuevaOfferta = getRepository(Offerta).create(data);

    return await getRepository(Offerta).save(nuevaOfferta);
};


export const put = async (id:number, data:DeepPartial<Offerta>): Promise<void> =>
{
   await getRepository(Offerta).update(id,data); 
}
