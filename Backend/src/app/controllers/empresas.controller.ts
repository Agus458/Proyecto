import { Request, Response } from "express";
import validator from "validator";
import { AppError } from "../../config/error/appError";
import * as empresasService from "../services/empresas.service";

export const getPendientes = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await empresasService.getPendientes());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la empresa");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de empresa invalido");

    const empresa = await empresasService.getById(Number.parseInt(request.params.id));

    if (!empresa) throw AppError.badRequestError("No existe ninguna empresa con el id ingresado");

    return response.status(200).json(empresa);
}

export const put = async (request: Request, response: Response): Promise<Response> => {
    
    return response.status(204).json();
}