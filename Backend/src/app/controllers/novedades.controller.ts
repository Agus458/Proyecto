import { Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import { removerArchivo } from "../libraries/file.library";
import { validatePagination } from "../libraries/validation.library";

import * as novedadesService from "../services/novedades.service";

/* ---------------------------------------< NOVEDADES CONTROLLER >--------------------------------------- */

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    const { skip, take } = validatePagination(request.query);

    const novedades = await novedadesService.get(skip, take);

    return response.status(200).json(novedades);
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.params.id != "string" || !validator.isInt(request.params.id)) throw AppError.badRequestError("Id invalido");

    const novedad = await novedadesService.getById(Number.parseInt(request.params.id));

    return response.status(200).json(novedad);
}

export const post = async (request: Request, response: Response): Promise<Response> => {
    return response.status(201).json(await novedadesService.post(request.body));
}

export const put = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.params.id != "string" || !validator.isInt(request.params.id)) throw AppError.badRequestError("Id invalido");

    await novedadesService.put(Number.parseInt(request.params.id), request.body);

    return response.status(200).json();
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.params.id != "string" || !validator.isInt(request.params.id)) throw AppError.badRequestError("Id invalido");

    await novedadesService._delete(Number.parseInt(request.params.id));

    return response.status(200).json();
}

export const putImagen = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.params.id != "string" || !validator.isInt(request.params.id)) throw AppError.badRequestError("Id invalido");

    const novedad = await novedadesService.getById(Number.parseInt(request.params.id));
    if (!novedad) throw AppError.badRequestError("No se encontro el novedad");

    // Validacion de archivos
    if (request.file) {
        if (novedad.imagen) {
            removerArchivo(novedad.imagen);
        }
        novedad.imagen = request.file.destination + "/" + request.file.filename;
    }

    await novedadesService.put(novedad.id, novedad);

    return response.status(201).json();
}
