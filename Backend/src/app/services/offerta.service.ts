//import { Request,Response } from "express";
//import * as
import { DeepPartial,getRepository } from "typeorm";
import { Domicilio } from "../models/domicilio.model";
import { MaximoNivelEducactivo } from "../models/enums";
import { Idioma } from "../models/Idioma.Model";
import { informatico } from "../models/Informatico.model";
import { jornadaLaboral } from "../models/JornadaLaboral.model";
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

export const getByPuesto = async(puesto:string): Promise<Offerta | undefined>=>{
    return await getRepository(Offerta).findOne({
        where:{ puesto}
    });
}
//export const getByPuesto = async(nombre)

export const getByIdioma = async(Idioma:Idioma): Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where: { Idioma }
    });
}

export const getByIdNombreOfferta = async(nombreOfferta:string):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne({
        where:{nombreOfferta}
    });
}

export const getByDescripcion = async(Descripcion:Text):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ Descripcion }
        
    });
}
export const getBySalario = async(Sueldo:Number):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ Sueldo }
        
    });
}

export const getBySMaximoNivelEducativo = async(nivelEducativo:MaximoNivelEducactivo):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ nivelEducativo }
        
    });
}

export const getBySCantidadEmpleados = async(CantidaddeEmpleados:Number):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ CantidaddeEmpleados}
        
    });
}


export const getBySBuscandoPersonal = async(isPersonal:Boolean):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ isPersonal}
        
    });
}

export const getBySAutor = async(Autor:String):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ Autor}
        
    });
}

export const getBySJornadaLaboral = async(jornadaLaboral:jornadaLaboral):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ jornadaLaboral}
        
    });
}

export const getBySInformatico = async(Informatico:informatico):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ Informatico }
        
    });
}

export const getBySDomicilio = async(Domicilio:Domicilio):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ Domicilio }
        
    });
}

export const getBySExpira = async(Expira:Date):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ Expira }
        
    });
}



//Para probar en testing
/*
export const getByEducacion = async(Educacion:string):Promise<Offerta | undefined> =>{
    return await getRepository(Offerta).findOne ({
        where:{ Educacion }
        
    });
}
*/


export const post = async (data: DeepPartial<Offerta>): Promise<Offerta> => {
    const nuevaOfferta = getRepository(Offerta).create(data);

    return await getRepository(Offerta).save(nuevaOfferta);
};



export const put = async (id:number, data:DeepPartial<Offerta>): Promise<void> =>
{
    await getRepository(Offerta).update(id,data);
   // await getRepository(Offerta).update(id,data);
};
