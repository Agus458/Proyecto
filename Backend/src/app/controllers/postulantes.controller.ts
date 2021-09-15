import { Request, Response } from "express";
import path from "path";
import { DeepPartial } from "typeorm";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import { Postulante } from "../models/postulante.model";
import * as postulantesService from "../services/postulantes.service";

/* ---------------------------------------< POSTULANTES CONTROLLER >--------------------------------------- */

export const getPerfil = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);

    return response.status(200).json(postulante);
}

export const getPerfilById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id) throw AppError.badRequestError("No se ingreso el id del postulante");
    if(!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const postulante = await postulantesService.getPerfilById(Number.parseInt(request.params.id));

    if(!postulante) throw AppError.badRequestError("No existe un postulante con el id ingresado");

    if(!postulante.perfilPublico) throw AppError.badRequestError("Este perfil es privado");

    return response.status(200).json(postulante);
}

export const putPostulante = async (request: Request, response: Response): Promise<Response> => {    
    let postulante: DeepPartial<Postulante> = {};
    Object.assign(postulante, request.body);
    
    if(request.files){
        let files = request.files as any;

        if(typeof files == "object"){
            if(files.imagen){
                postulante.imagen = files.imagen[0].destination + "/" + files.imagen[0].filename;
            }
        }
    }

    console.log(postulante);
    await postulantesService.put(request.user.id, postulante);

    return response.status(200).json();
}