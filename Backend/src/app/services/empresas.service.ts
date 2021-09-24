import { DeepPartial, getRepository } from "typeorm";
import { Empresa } from "../models/empresa.model";

/* ---------------------------------------< EMPRESAS SERVICE >--------------------------------------- */

// Retorna todos las empresas almacenados en el sistema.
export const get = async (): Promise<Empresa[]> => {
    return await getRepository(Empresa).find();
};

// Retorna la empresa almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Empresa | undefined> => {
    return await getRepository(Empresa).findOne(id);
};

// Retorna la Empresa almacenada en el sistema cuyo email sea el ingresado.
export const getByEmail = async (email: string): Promise<Empresa | undefined> => {
    return await getRepository(Empresa).findOne({
        where: { email }
    });
};

// Almacena en el sistema una nueva empresa.
export const post = async (data: DeepPartial<Empresa>): Promise<Empresa> => {
    const nuevaEmpresa = getRepository(Empresa).create(data);
    
    return await getRepository(Empresa).save(nuevaEmpresa);
};


export const put = async (id:number,data:DeepPartial<Empresa>):Promise<void> =>
{
    await getRepository(Empresa).update(id,data);
}