import { Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import { encryptPassword } from "../libraries/encryptation.library";

import * as postulantesService from "../services/postulantes.service";
import * as usuariosService from "../services/usuarios.service";
import * as empresasService from "../services/empresas.service";
import { createToken } from "../libraries/tokens.library";
import { EstadoUsuario } from "../models/enums";

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