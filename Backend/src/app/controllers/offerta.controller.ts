import { Request,Response } from "express";
import validator from "validator";
import { AppError } from "../../config/error/appError";
import * as offertaService from "../../app/services/offerta.service";
import { Formulario } from "../models/Formulario.model";

/*
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

}
*/