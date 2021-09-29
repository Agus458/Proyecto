import { Request, Response } from "express";
import validator from "validator";
import jwt from "jsonwebtoken";

import { AppError } from "../../config/error/appError";
import { encryptPassword } from "../libraries/encryptation.library";

import * as postulantesService from "../services/postulantes.service";
import * as usuariosService from "../services/usuarios.service";
import * as empresasService from "../services/empresas.service";
import * as restablecerContraseniaService from "../services/restablecerContrasenia.service";
import { createToken, verifyToken } from "../libraries/tokens.library";
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

export const restablecerContrasenia = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.body.email != "string") throw AppError.badRequestError("Email invalido o no ingresado");

    const usuario = await usuariosService.getContraseniaByEmail(request.body.email);
    if (!usuario) throw AppError.badRequestError("No existe un usuario con el email ingresado");

    const token = jwt.sign({ email: usuario.email }, process.env.SECRET + usuario.contrasenia as string, { expiresIn: "15m" });

    await restablecerContraseniaService.post(token, usuario.email);

    return response.status(200).json(token);
}

export const cambiarContrasenia = async (request: Request, response: Response): Promise<Response> => {
    const token = request.body.token;
    if (typeof token != "string") throw AppError.badRequestError("No se ingreso el token");
    if (typeof request.body.contrasenia != "string") throw AppError.badRequestError("No se ingreso la nueva contraseña");

    const rest = await restablecerContraseniaService.getByToken(token);
    if (!rest) throw AppError.badRequestError("Token invalido");

    const usuario = await usuariosService.getContraseniaByEmail(rest.email);
    if (!usuario) throw AppError.badRequestError("No existe el usuario");

    const email = verifyToken(token, process.env.SECRET + usuario.contrasenia as string);

    if(!email) throw AppError.badRequestError("Token ya utilizado o invalido");

    usuario.contrasenia = await encryptPassword(request.body.contrasenia);

    usuariosService.actualizar(usuario);

    return response.status(200).json();
}