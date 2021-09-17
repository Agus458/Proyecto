import { Request, Response } from "express";
import moment from "moment";
import { DeepPartial } from "typeorm";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import { removerArchivo } from "../libraries/file.library";
import { validarDocumento, validarDomicilio } from "../libraries/validation.library";
import { Sexo } from "../models/enums";
import { Postulante } from "../models/postulante.model";
import * as postulantesService from "../services/postulantes.service";

/* ---------------------------------------< POSTULANTES CONTROLLER >--------------------------------------- */

export const getPerfil = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);

    return response.status(200).json(postulante);
}

export const getPerfilById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del postulante");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const postulante = await postulantesService.getPerfilById(Number.parseInt(request.params.id));

    if (!postulante) throw AppError.badRequestError("No existe un postulante con el id ingresado");

    if (!postulante.perfilPublico) throw AppError.badRequestError("Este perfil es privado");

    return response.status(200).json(postulante);
}

export const putPostulante = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");

    // Validacion del documento del Postulante.
    if (request.body.tipoDocumento || request.body.documento) {
        validarDocumento(request.body.tipoDocumento, request.body.documento);
    }

    // Validacion del domicilio.
    request.body.domicilio = await validarDomicilio(request.body.domicilio, postulante.domicilio);

    if (request.body.sexo) {
        if (typeof request.body.sexo != "number" || !Sexo[request.body.sexo]) throw AppError.badRequestError("Sexo invalido");
    }

    if (request.body.fechaNacimiento) {
        if (typeof request.body.fechaNacimiento != "string" || validator.isDate(request.body.fechaNacimiento)) throw AppError.badRequestError("Fecha de nacimiento invalida");
        request.body.fechaNacimiento = moment(request.body.fechaNacimiento, "DD-MM-YYYY").toDate();
    }

    await postulantesService.put(request.user.id, request.body);

    return response.status(201).json();
}

export const putArchivos = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");

    let data: DeepPartial<Postulante> = {};

    // Validacion de archivos
    if (request.files) {
        let files = request.files as any;
        if (typeof files == "object") {

            // Imagen de perfil.
            if (files.imagen) {
                if(postulante.imagen) {
                    removerArchivo(postulante.imagen);
                }
                data.imagen = files.imagen[0].destination + "/" + files.imagen[0].filename;
            }

        }
    }

    await postulantesService.put(request.user.id, data);

    return response.status(201).json();
}