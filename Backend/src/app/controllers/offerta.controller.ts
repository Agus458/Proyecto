import { request, Request,Response } from "express";
import validator from "validator";
import { AppError } from "../../config/error/appError";
import * as offertaService from "../../app/services/offerta.service";



export const getAll = async (request: Request, response: Response): Promise<Response> => {
    let skip = undefined, take = undefined;

    if (request.query.skip) {
        if (typeof request.query.skip == "string" && validator.isInt(request.query.skip)) { skip = Number.parseInt(request.query.skip) } else { throw AppError.badRequestError("Skip invalido") };
    }

    if (request.query.take) {
        if (typeof request.query.take == "string" && validator.isInt(request.query.take)) { take = Number.parseInt(request.query.take) } else { throw AppError.badRequestError("Take invalido") };
    }

    const offerta = await offertaService.get(skip, take);

    return response.status(200).json(offerta);
}

export const getOfferta = async(request:Request,response:Response):Promise<Response>=>{
    const Offerta = await offertaService.get();

    return response.status(200).json(Offerta);
}

export const getOffertaById = async(request:Request, response:Response): Promise<Response> =>
{
    if(!request.params.id) throw AppError.badRequestError("No es ingreso el id del formulario");
    if(validator.isNumeric(request.params.id)) throw AppError.badRequestError("Id del formulario es invalido");

    const offerta = await offertaService.getById(Number.parseInt(request.params.id));
    if(!offerta) throw AppError.badRequestError("no existe ninguna offerta con el id ingresado");

    return response.status(200).json(offerta);

}

export const postOfferta = async(request:Request,response:Response): Promise<Response> =>
{
 if(!request.params.id) throw AppError.badRequestError("Id de localidad invalida");
 if(validator.isNumeric(request.params.id)) throw AppError.badRequestError("Id de localidad invalido");

const offerta = await offertaService.getById(Number.parseInt(request.params.id));
if(!offerta) throw AppError.badRequestError("No existe ningun departamento con el id ingresado");

await offertaService.post(request.body);
return response.status(201).json();

}

export const putOfferta = async(request:Request,response:Response) : Promise<Response> =>
{
    if(!request.params.id) throw AppError.badRequestError("No se ingreso el id de la Offerta");
    if(validator.isInt(request.params.id)) throw AppError.badRequestError("Id de la Offerta invalido");
    if(request.body.offerta)
    {
        if(typeof request.body.offerta != "number") throw AppError.badRequestError("No existe ninguna offerta con el id ingresado");
    }
    if(! await offertaService.getById(Number.parseInt(request.params.id))) throw AppError.badRequestError("No existe ninguna offerta con el id ingresado ");
    await offertaService.put(Number.parseInt(request.params.id),request.body);
    return response.status(200).json();
}


export const _delete = async(request:Request,response:Response): Promise<Response>=>{
    if(typeof request.params.id != "string" || !validator.isInt(request.params.id)) throw AppError.badRequestError("Id invalido");

    await offertaService._delete(Number.parseInt(request.params.id));

    return response.status(200).json();
}



/*
export const isExpirate= async(request:Request, response:Response):Promise<Response> =>{
    if(!request.params.data) throw AppError.badRequestError("No se ingreso datos validos");
    if(validator.isDate(request.body.data.Date)) throw AppError.badRequestError("No existe ninguna offerta la fecha expirada");
    if(request.body.data.Date)
    {
            if(typeof request.body.expirada <= request.body.Date) throw AppError.badRequestError("La Fecha es invalida");
    }
    if(!await offertaService.getBySExpira(request.params.Date))throw AppError.badRequestError("");
}
*/
