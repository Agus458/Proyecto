import { request, Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import * as offertaService from "../services/offerta.service";


export const getOfferta = async(request:Request,response:Response): Promise<Response>=>{
    const offerta= await offertaService.get();

    return response.status(200).json(offerta);

}

export const getOffertaById = async(request: Request, response: Response):Promise<Response> =>{
    if(!request.params.id) throw AppError.badRequestError("No se ingreso el id de la offerta");
    if(!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de localidad invalido");

    const offerta = await offertaService.getById(Number.parseInt(request.params.id));

    if(!offerta) throw AppError.badRequestError("No existe ninguna localidad con el id ingresado");

    return response.status(200).json(offerta);
}

