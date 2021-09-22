import { Request, Response } from "express";
import moment from "moment";
import { DeepPartial } from "typeorm";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import { removerArchivo } from "../libraries/file.library";
import { validarCapacitaciones, validarDocumento, validarDomicilio } from "../libraries/validation.library";
import { Postulante } from "../models/postulante.model";
import { create } from "../services/capacitaciones.service";
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
        if (typeof request.body.sexo != "string") throw AppError.badRequestError("Sexo invalido");
    }

    if (request.body.fechaNacimiento) {
        if (typeof request.body.fechaNacimiento != "string" || validator.isDate(request.body.fechaNacimiento)) throw AppError.badRequestError("Fecha de nacimiento invalida");
        const fechaNacimiento = moment(request.body.fechaNacimiento, "DD-MM-YYYY");
        if(fechaNacimiento.isAfter(moment())) throw AppError.badRequestError("Fecha de nacimiento debe ser anterior a la fecha actual");
        request.body.fechaNacimiento = fechaNacimiento.toDate();
    }

    if(request.body.capacitaciones){
        validarCapacitaciones(request.body.capacitaciones);
    }

    await postulantesService.put(postulante.id, request.body);

    return response.status(201).json();
}

export const putImagen = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");

    // Validacion de archivos
    if (request.file) {
        if (postulante.imagen) {
            removerArchivo(postulante.imagen);
        }
        postulante.imagen = request.file.destination + "/" + request.file.filename;
    }

    await postulantesService.put(postulante.id, postulante);

    return response.status(201).json();
}