import { Console } from "console";
import { DeepPartial,getRepository } from "typeorm";

export function get() {
    throw new Error("Function not implemented.");
}

export function getById(arg0: number) {
    throw new Error("Function not implemented.");
}

export function post(body: any) {
    throw new Error("Function not implemented.");
}
/*
import { Formulario } from "../models/f";

export const get = async():Promise<Formulario[]> =>{
    return await getRepository(Formulario).find();
};

export const getById = async(id:number):Promise<Formulario | undefined>=>{
console.log(id);

return await getRepository(Formulario).findOne(id);
}


export const getByNamePostulante = async(nombrePostulante:string): Promise<Formulario | undefined>=> {
    return getRepository(Formulario).findOne({
        where:{nombrePostulante}
    })
}


export const post = async(data:DeepPartial<Formulario>): Promise<void> =>
{
    const nuevoFormulario = getRepository(Formulario).create(data);
    await getRepository(Formulario).save(nuevoFormulario);
}

export const put = async (id:number, data:DeepPartial<Formulario>): Promise<void>=>
{
    await getRepository(Formulario).update(id,data);
}
*/