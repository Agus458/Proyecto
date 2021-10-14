import { Request, Response } from "express";
import { request } from "http";
import validator from "validator";
import { AppError } from "../../config/error/appError";
import * as empresasService from "../services/empresas.service";
import * as usuariosService from "../services/usuarios.service";
import * as offertaService from "../services/offerta.service";
//import { Offerta } from "../models/offera.model";
import { validarCapacitaciones } from "../libraries/validation.library";
import { MAX_ACCESS_BOUNDARY_RULES_COUNT } from "google-auth-library/build/src/auth/downscopedclient";

export const getPendientes = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await empresasService.getPendientes());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la empresa");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de empresa invalido");

    const empresa = await empresasService.getById(Number.parseInt(request.params.id));

    if (!empresa) throw AppError.badRequestError("No existe ninguna empresa con el id ingresado");

    return response.status(200).json(empresa);
}

export const getOfferta = async (request:Request,response:Response):Promise<Response>=>{
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la empresa");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de empresa invalido");

    const offerta = await offertaService.getById(Number.parseInt(request.params.id));

    if (!offerta) throw AppError.badRequestError("No existe ninguna empresa con el id ingresado");
   
    return response.status(200).json(offerta);
}

export const getOffertaAll = async (request:Request,response:Response):Promise<Response>=>{
   
    const offerta = await offertaService.get();

   
    return response.status(200).json(offerta);
}
/*
export const PublicarOfferta= async(request: Request,response: Response): Promise<Response> =>{

}*/
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

/*
export const putOfferta= async (request:Request,response:Response):Promise<Response>=>{
    const offeta = await offertaService.getById(request.user.id);
    if(!Offerta) throw AppError.badRequestError("No se encuentra la offerta");
    
    request.body.domicilio = await validarCapacitaciones
}
*/
//export const inscribirseOfferta = async(request:Request, response:Response):Promise<Response>=>
export const realizarOfferta = async (request:Request,response:Response):Promise<Response>=>{
 /*
   if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
 if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
 */
 //if(!request.body.user) throw AppError.badRequestError("No se ingreso el nombre de la localidad");
//if(!request.body.RutEmpresa) throw AppError.badRequestError("No se ingreso el el Runt de la offerta");

const empresa = await empresasService.getById(Number.parseInt(request.params.id))
;
//const usuario = await usuariosService.getByEmailContrasenia(request.body.email, request.body.contrasenia);
if(!empresa) throw AppError.badRequestError("No existe ningun empresa con el id ingresado");
//if (usuario.constructor.name == "Empresa") {
request.body.empresa = empresa;
await offertaService.post(request.body);
//}
return response.status(201).json();
}

export const ActualizarOfferta = async (request:Request,response:Response):Promise<Response>=>{
    const empresa = await empresasService.getById(Number.parseInt(request.params.id))
    if(!empresa) throw AppError.badRequestError("No existe ningun empresa con el id ingresado");
    await offertaService.put(empresa.id,request.body);
    return response.status(201).json();
}

