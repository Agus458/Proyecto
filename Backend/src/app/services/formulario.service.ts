import { Console } from "console";
import { DeepPartial,getRepository } from "typeorm";
import { Formulario } from "../models/Formulario.model";

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