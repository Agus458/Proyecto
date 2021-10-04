import { Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";

import * as novedadesService from "../services/novedades.service";

/* ---------------------------------------< NOVEDADES CONTROLLER >--------------------------------------- */

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    let skip = undefined, take = undefined;

    if (request.query.skip) {
        if (typeof request.query.skip == "string" && validator.isInt(request.query.skip)) { skip = Number.parseInt(request.query.skip) } else { throw AppError.badRequestError("Skip invalido") };
    }

    if (request.query.take) {
        if (typeof request.query.take == "string" && validator.isInt(request.query.take)) { take = Number.parseInt(request.query.take) } else { throw AppError.badRequestError("Take invalido") };
    }

    const novedades= await novedadesService.get(skip, take);

    return response.status(200).json(novedades);
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.params.id != "string" || !validator.isInt(request.params.id)) throw AppError.badRequestError("Id invalido");

    const novedad = await novedadesService.getById(Number.parseInt(request.params.id));

    return response.status(200).json(novedad);
}

export const post = async (request: Request, response: Response): Promise<Response> => {
    await novedadesService.post(request.body);

    return response.status(201).json();
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