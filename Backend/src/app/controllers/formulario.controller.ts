import { Request,Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
//import { Localidad } from "../models/localidad.model";
import * as formularioServices from "../services/formulario.service";


export const getFormulario = async(request:Request, response:Response ): Promise<Response> => {
    const Formulario = await formularioServices.get();

    return response.status(200).json(Formulario);
}
    export const getFormularioById = async(request:Request,response:Response): Promise<Response> =>
    {
        if(!request.params.id) throw AppError.badRequestError("No se ingreso el id del formulario");
        if(validator.isNumeric(request.params.id)) throw AppError.badRequestError("Id del formulario es invalido");

        const formulario = await formularioServices.getById(Number.parseInt(request.params.id));

        if(!formulario) throw AppError.badRequestError("no existe ningun formulario con el id ingresado");

        return response.status(200).json(formulario);
    }

    
    export const postFormulario = async (request:Request, response:Response): Promise<Response> => {
        if(!request.body.nombre) throw AppError.badRequestError("No se ingreso el nombre del Postulante");
        if(!request.body.apellido) throw AppError.badRequestError("No se ingreso el apellido del Postulante");
        if(!request.body.email) throw AppError.badRequestError("No se ingreso el email del Postulante");
        if(!request.body.educacion) throw AppError.badRequestError("No se ingreso los Datos de educacion del Postulante");
        if(!request.body.idiomas) throw AppError.badRequestError("No se ingreso el nivel de idiomas del Postulante");
        if(!request.body.JornadaLaboral) throw AppError.badRequestError("No se ingreso el nivel de idiomas del Postulante");
        if(!request.body.ExperienciaLaboral) throw AppError.badRequestError("No se ingreso el nivel de idiomas del Postulante");
        if(!request.body.informatico) throw AppError.badRequestError("No se ingreso el nivel de idiomas del Postulante");
        if(!request.body.PermisosYLicencias) throw AppError.badRequestError("No se ingreso el nivel de idiomas del Postulante");
        if(!request.body.ReferenciaLaboral) throw AppError.badRequestError("No se ingreso el nivel de idiomas del Postulante");
        if(!request.body.Curso) throw AppError.badRequestError("No se ingreso el nivel de idiomas del Postulante");
        
        //Todavia no se agregaron los elementos de chequeo

        const formulario = await formularioServices.getById(request.body.formulario);
        if(!formulario) throw AppError.badRequestError("No existe ningun departamento con el id ingresado")

        await formularioServices.post(request.body);

        return response.status(201).json();
    }

    export const putFormulario = async(request: Request,response:Response): Promise<Response> =>
    {
       if(!request.params.id) throw AppError.badRequestError("No se ingreso el id del formulario");
       if(validator.isNumeric(request.params.id)) throw AppError.badRequestError("Id de la localidad invalido");
       if(request.body.departamento)
       {
           if(typeof request.body.departamento !="number") throw AppError.badRequestError("Id de departamento invalido");
           if(!await formularioServices.getById(request.body.formulario)) throw AppError.badRequestError("No existe ningun formulario con el id ingresado");
       }
       if(!await formularioServices.getById(Number.parseInt(request.params.id))) throw AppError.badRequestError("No existe ningun Formulario con el id ingresado");

       await formularioServices.put(Number.parseInt(request.params.id), request.body);

       return response.status(200).json();

    }