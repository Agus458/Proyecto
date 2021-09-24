import { Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import * as departamentosService from "../services/departamentos.service";
import * as localidadesService from "../services/localidades.service";

/* ---------------------------------------< LOCALIDADES CONTROLLER >--------------------------------------- */

export const getLocalidades = async (request: Request, response: Response): Promise<Response> => {
    const localidades = await localidadesService.get();

    return response.status(200).json(localidades);
}

export const getLocalidadById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del localidad");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de localidad invalido");

    const localidad = await localidadesService.getById(Number.parseInt(request.params.id));

    if (!localidad) throw AppError.badRequestError("No existe ninguna localidad con el id ingresado");

    return response.status(200).json(localidad);
}

export const getLocalidadesByDepartamento = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del departamento");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de departamento invalido");

    const departamento = await departamentosService.getById(Number.parseInt(request.params.id));
    if (!departamento) throw AppError.badRequestError("No existe ningun departamento con el id ingresado");

    const localidades = await localidadesService.getByDepartamento(departamento);

    return response.status(200).json(localidades);
}

export const postLocalidad = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.nombre) throw AppError.badRequestError("No se ingreso el nombre de la localidad");
    if (!request.body.departamento) throw AppError.badRequestError("No se ingreso el departamento de la localidad");
    if (typeof request.body.departamento != "number") throw AppError.badRequestError("Id de departamento invalido");

    const departamento = await departamentosService.getById(request.body.departamento);
    if (!departamento) throw AppError.badRequestError("No existe ningun departamento con el id ingresado");

    await localidadesService.post(request.body);

    return response.status(201).json();
}

export const putLocalidad = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la localidad");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de la localidad invalido");

    if (request.body.departamento) {
        if (typeof request.body.departamento != "number") throw AppError.badRequestError("Id de departamento invalido");

        if (!await departamentosService.getById(request.body.departamento)) throw AppError.badRequestError("No existe ningun departamento con el id ingresado");
    }

    if (! await localidadesService.getById(Number.parseInt(request.params.id))) throw AppError.badRequestError("No existe ninguna localidad con el id ingresado");

    await localidadesService.put(Number.parseInt(request.params.id), request.body);

    return response.status(200).json();
}