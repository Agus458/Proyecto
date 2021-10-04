import { Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import * as departamentosService from "../services/departamentos.service";
import * as paisesService from "../services/paises.service";

/* ---------------------------------------< DEPARTAMENTOS CONTROLLER >--------------------------------------- */

export const getDepartamentos = async (request: Request, response: Response): Promise<Response> => {
    const departamentos = await departamentosService.get();

    return response.status(200).json(departamentos);
}

export const getDepartamentoById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del departamento");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de departamento invalido");

    const departamento = await departamentosService.getById(Number.parseInt(request.params.id));

    if (!departamento) throw AppError.badRequestError("No existe ningun departamento con el id ingresado");

    return response.status(200).json(departamento);
}

export const getDepartamentosByPais = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del pais");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de pais invalido");

    const pais = await paisesService.getById(Number.parseInt(request.params.id));
    if (!pais) throw AppError.badRequestError("No existe ningun pais con el id ingresado");

    const departamentos = await departamentosService.getByPais(pais);

    return response.status(200).json(departamentos);
}

export const postDepartamento = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.nombre) throw AppError.badRequestError("No se ingreso el nombre del departamento");
    if (!request.body.pais) throw AppError.badRequestError("No se ingreso el pais del departamento");
    if (typeof request.body.pais != "number") throw AppError.badRequestError("Id de pais invalido");

    const pais = await paisesService.getById(request.body.pais);

    if (!pais) throw AppError.badRequestError("No existe ningun pais con el id ingresado");

    await departamentosService.post(request.body);

    return response.status(201).json();
}

export const putDepartamento = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del departamento");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de departamento invalido");

    if (request.body.pais) {
        if (typeof request.body.pais != "number") throw AppError.badRequestError("Id de pais invalido");

        if (!await paisesService.getById(request.body.pais)) throw AppError.badRequestError("No existe ningun pais con el id ingresado");
    }

    if (! await departamentosService.getById(Number.parseInt(request.params.id))) throw AppError.badRequestError("No existe ningun departamento con el id ingresado");

    await departamentosService.put(Number.parseInt(request.params.id), request.body);

    return response.status(200).json();
}