//import { Request,Response } from "express";
//import * as
import { DeepPartial,getRepository, Repository } from "typeorm";



import { Offerta} from "../models/offerta.model";
import { Postulante } from "../models/postulante.model";


export const get = async(skip?:number,take?:number):Promise<{offerta:Offerta[], cantidad:number}> =>{
    const result = await getRepository(Offerta).findAndCount({
        skip, take, order: { fechaPublicacion: "DESC" }
    });

    return { offerta: result[0], cantidad: result[1] };
}
export const getById = async(id:number):Promise<Offerta | undefined>=>{
    console.log(id);

    return await getRepository(Offerta).findOne(id);
}




export const getByRut = async(RUT:number):Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{RUT}
    })
}


export const getByRazonSocial = async(id:string):Promise<Offerta | undefined>=>{
    console.log(id);

    return await getRepository(Offerta).findOne(id);
}


export const getByTelefonoContacto = async(TelefonoContacto:number):Promise<Offerta|undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{}
    })
}


export const getByNameEnterprise = async(nombreEmpresa:string): Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where: {nombreEmpresa}
    });
}

export const getByEmailContacto = async(EmailEmpresa:string): Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where: {EmailEmpresa}
    });
}
export const getByVacantes = async(Vacantes:Number): Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where: {Vacantes}
    });
}

export const getByRequisitosExcluyentes = async(RequisitosExcluyente:string): Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where: {RequisitosExcluyente}
    });
}
export const getByRequisitosValorados = async(RequisitosValorados:string): Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where: {RequisitosValorados}
    });
}

export const getByPuesto = async(puesto:string): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{ puesto}
    });
}

export const getByHorarioTrabajo = async(HorarioTrabajo:TimeRanges): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{HorarioTrabajo}
    });
}

export const getByRangoSalario = async(RangoSalario:string): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{RangoSalario}
    });
}
export const getByNombreOfferta = async(NombreOfferta:string): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{NombreOfferta}
    });
}

export const getByNombreEmpresa = async(NombreEmpresa:string): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{NombreEmpresa}
    });
}
export const getByDescripcion = async(descripcion:string): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{descripcion}
    });
}
export const getByfechaLimite = async(fechaLimite:Date): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{fechaLimite}
    });
}

export const getByfechaPublicacion = async(fechaPublicacion:Date): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{fechaPublicacion}
    });
}


//export const getByPuesto = async(nombre)



export const getByIdNombreOfferta = async(nombreOfferta:string):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where:{nombreOfferta}
    });
}














export const getByFechaCierre = async(FechaCierre:Date):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{FechaCierre }
        
    });
}

export const getByVsible = async(Visible:boolean):Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{ Visible}
        
    })
}
//Para probar en testing
/*
export const getByEducacion = async(Educacion:string):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ Educacion }
        
    });
}
*/
export const getByInscripciones = async(Inscripciones:Postulante[]):Promise<Offerta | undefined>=>
{
    return await getRepository(Offerta).findOne({
        where:{Inscripciones}
    });
}
export const post = async (data: DeepPartial<Offerta>): Promise<Offerta> => {
    const nuevaOfferta = getRepository(Offerta).create(data);

    return await getRepository(Offerta).save(nuevaOfferta);
};



export const put = async (id:number, data:DeepPartial<Offerta>): Promise<void> =>
{
    data.id=id;
    await getRepository(Offerta).update(id,data);
   // await getRepository(Offerta).update(id,data);
};

export const _delete = async (id:number): Promise<void> =>{
    await getRepository(Offerta).delete(id);
}
