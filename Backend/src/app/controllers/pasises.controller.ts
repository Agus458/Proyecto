import { Request, Response } from "express";

import { AppError } from "../../config/error/appError";
import * as paisesService from "../services/paises.service";

/* ---------------------------------------< PAISES CONTROLLER >--------------------------------------- */

export const getPaises = async (request: Request, response: Response): Promise<Response> => {
    const paises = await paisesService.get();

    return response.status(200).json(paises);
}

export const getPaisById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del pais");
    if (typeof request.params.id != "number") throw AppError.badRequestError("Id de pais invalido");

    const pais = await paisesService.getById(request.params.id);

    if (!pais) throw AppError.badRequestError("No existe ningun pais con el id ingresado");

    return response.status(200).json(pais);
}

export const getPaisByNombre = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.nombre) throw AppError.badRequestError("No se ingreso el nombre del pais");
    if (typeof request.params.nombre != "string") throw AppError.badRequestError("Nombre de pais invalido");

    const pais = await paisesService.getByNombre(request.params.nombre);

    if (!pais) throw AppError.badRequestError("No existe ningun pais con el nombre ingresado");

    return response.status(200).json(pais);
}

export const postPais = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.nombre) throw AppError.badRequestError("No se ingreso el nombre del pais");
    
    await paisesService.post(request.body);

    return response.status(201).json();
}

export const putPais = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del pais");
    if (typeof request.params.id != "number") throw AppError.badRequestError("Id de pais invalido");

    if (! await paisesService.getById(request.params.id)) throw AppError.badRequestError("No existe ningun pais con el id ingresado");

    await paisesService.put(request.params.id, request.body);

    return response.status(200).json();
}