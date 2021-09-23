import { Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import { removerArchivo } from "../libraries/file.library";
import { validarCapacitaciones, validarConocimientoInformatico, validarDatosPersonales, validarDomicilio, validarExperienciasLaborales, validarIdiomas } from "../libraries/validation.library";
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

    // Validacion de datos personales del Postulante.
    validarDatosPersonales(request.body);
    
    // Validacion del domicilio.
    request.body.domicilio = await validarDomicilio(request.body.domicilio, postulante.domicilio);

    if(request.body.capacitaciones){
        request.body.capacitaciones = await validarCapacitaciones(request.body.capacitaciones, postulante);
    }

    if(request.body.conocimientosInformaticos){
        request.body.conocimientosInformaticos = await validarConocimientoInformatico(request.body.conocimientosInformaticos, postulante);
    }

    if(request.body.idiomas){
        request.body.idiomas = await validarIdiomas(request.body.idiomas, postulante);
    }

    if(request.body.experienciasLaborales){
        request.body.experienciasLaborales = await validarExperienciasLaborales(request.body.experienciasLaborales, postulante);
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