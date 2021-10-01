import { request, Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import { encryptPassword } from "../libraries/encryptation.library";

import * as postulantesService from "../services/postulantes.service";
import * as usuariosService from "../services/usuarios.service";
import * as empresasService from "../services/empresas.service";
import * as offertaService from "../services/offerta.service";
import { createToken } from "../libraries/tokens.library";
import { EstadoUsuario } from "../models/enums";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { threadId } from "worker_threads";
import { RepositoryNotTreeError } from "typeorm";
import { Offerta } from "../models/offerta.model";

/* ---------------------------------------< AUTH CONTROLLER >--------------------------------------- */

export const registrarse = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
    if (!validator.isEmail(request.body.email)) throw AppError.badRequestError("El email ingresado no es valido");

    if (await usuariosService.getByEmail(request.body.email)) throw AppError.badRequestError("Ya existe un usuario con el email ingresado");

    request.body.contrasenia = await encryptPassword(request.body.contrasenia);
    request.body.estado = EstadoUsuario.ACTIVO;

    const result = await postulantesService.post(request.body);

    const { token, exp } = createToken(result.email);

    return response.status(201).json({ usuario: { email: result.email, tipo: result.constructor.name }, token, exp });
}

export const iniciarSesion = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");

    const usuario = await usuariosService.getByEmailContrasenia(request.body.email, request.body.contrasenia);

    if (!usuario) throw AppError.badRequestError("Credenciales Invalidas");

    const { token, exp } = createToken(usuario.email);

    return response.status(200).json({ usuario: { email: usuario.email, tipo: usuario.constructor.name }, token, exp });
}

export const solicitarEmpresa = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
    if (!validator.isEmail(request.body.email)) throw AppError.badRequestError("El email ingresado no es valido");

    if (await usuariosService.getByEmail(request.body.email)) throw AppError.badRequestError("Ya existe un usuario con el email ingresado");

    request.body.contrasenia = await encryptPassword(request.body.contrasenia);

    const result = await empresasService.post(request.body);

    const { token, exp } = createToken(result.email);

    return response.status(201).json({ usuario: { email: result.email, tipo: result.constructor.name }, token, exp });
}

export const CrearOfferta = async(request:Request, response: Response):Promise<Response>=>
{

if(!isLoggedIn) throw AppError.badRequestError("No se esta loggeado");
if(!request.body.nombreEmpresa) throw AppError.badRequestError("No hay nombre de empresa");
if(!request.body.RutEmpresa) throw AppError.badRequestError("No hay Rut de la empresa");

if(await offertaService.getByRut(request.body.Rut)) throw AppError.badRequestError("Ya existe un Rut de la empresa");

const result = await offertaService.post(request.body);

return response.status(201).json({offerta:{Rut:result.RutEmpresa,tipo: result.constructor.name}})
    
}

export const InscribirseAOfferta = async(request:Request,response:Response):Promise<Response>=>
{
if(!isLoggedIn) throw AppError.badRequestError("No se a loggeado");
if(!request.body.id) throw AppError.badRequestError("no existe el id del propueste")
if(!request.body.RutEmpresa)throw AppError.badRequestError("No existe el Rut");
if(!request.body.email) throw AppError.badRequestError("No existe ese email");
//if(await offertaService.getByRut(request.body.Rut)) throw AppError.badRequestError("No existe ")

const result = await offertaService.put(request.body.id,request.body);

//if(!request.body.email) throw AppError.badRequestError("no hay email del postulante");
//if(!request.body.contrasenia) throw AppError.badRequestError("no se ingreso la cntraseña");
//return response.status(201).json({offerta:{Rut:result,tipo: result.constructor.}})
return response.status(201).json();
}

export const ObtenerInscriptosAOfferta = async(request:Request, response:Response):Promise<Response> =>
{
    if(!isLoggedIn) throw AppError.badRequestError("No se a loggeado");
    if(!request.body.id) throw AppError.badRequestError("no existe el id del propueste")
    if(!request.body.RutEmpresa)throw AppError.badRequestError("No existe el Rut");
    if(!request.body.email) throw AppError.badRequestError("No existe ese email");

    const result = await offertaService.getByInscripciones(request.body.postulantesService.email);

    

    return response.status(201).json({offerta:{Email:result?.puesto,Rut:result?.RutEmpresa}});
}
