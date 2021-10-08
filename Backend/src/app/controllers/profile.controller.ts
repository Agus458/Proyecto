import { Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import * as profileService from "../services/profile.service";

/* ---------------------------------------< Profile CONTROLLER >--------------------------------------- */

export const get = (type: Object) => async (request: Request, response: Response): Promise<Response> => {
    const data = await profileService.get(type);

    return response.status(200).json(data);
}

export const getById = (type: Object) => async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id");

    const localidad = await profileService.getById(type, Number.parseInt(request.params.id));

    if (!localidad) throw AppError.badRequestError("No existe ningun dato con el id ingresado");

    return response.status(200).json(localidad);
}

export const post = (type: Object) => async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.nombre) throw AppError.badRequestError("No se ingreso el nombre del dato");

    await profileService.post(type, request.body);

    return response.status(201).json();
}

export const put = (type: Object) => async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la localidad");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de la localidad invalido");

    if (! await profileService.getById(type, Number.parseInt(request.params.id))) throw AppError.badRequestError("No existe ningun dato con el id ingresado");

    await profileService.put(type, Number.parseInt(request.params.id), request.body);

    return response.status(200).json();
}