import { Request, Response } from "express";
import validator from "validator";
import { AppError } from "../../config/error/appError";
import * as empresasService from "../services/empresas.service";
import * as usuariosService from "../services/usuarios.service";

export const getPendientes = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await empresasService.getPendientes());
}

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await empresasService.getAll());
}


export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la empresa");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de empresa invalido");

    const empresa = await empresasService.getById(Number.parseInt(request.params.id));

    if (!empresa) throw AppError.badRequestError("No existe ninguna empresa con el id ingresado");

    return response.status(200).json(empresa);
}

export const put = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la empresa");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de empresa invalido");

    const empresa = await empresasService.getById(Number.parseInt(request.params.id));

    if (!empresa) throw AppError.badRequestError("No existe ninguna empresa con el id ingresado");

    if(request.body.email && request.body.email != empresa.email){
        if(await usuariosService.getByEmail(request.body.email)) throw AppError.badRequestError("Email en uso");
    }

    if(request.body.rut && request.body.rut != empresa.rut){
        if(await empresasService.getByRut(request.body.rut)) throw AppError.badRequestError("Rut en uso");
    }

    await empresasService.put(empresa.id, request.body);

    return response.status(204).json();
}