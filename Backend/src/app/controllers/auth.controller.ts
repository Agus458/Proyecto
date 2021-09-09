import { Request, Response } from "express";
import validator from "validator";
import jwt from "jsonwebtoken";
import { AppError } from "../../config/error/appError";
import * as postulantesService from "../services/postulantes.service";
import * as usuariosService from "../services/usuarios.service";
import * as empresasService from "../services/empresas.service";
import { Postulante } from "../models/postulante.model";

/* ---------------------------------------< AUTH CONTROLLER >--------------------------------------- */

export const registrarse = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
    if (!validator.isEmail(request.body.email)) throw AppError.badRequestError("El email ingresado no es valido");

    if (await usuariosService.getByEmail(request.body.email)) throw AppError.badRequestError("Ya existe un usuario con el email ingresado");

    const result = await postulantesService.post(request.body);

    const token = jwt.sign({ usuario: result }, process.env.SECRET as string, { expiresIn: "1d" });

    return response.status(201).json(token);
}

export const iniciarSesion = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");

    const usuario = await usuariosService.getByEmail(request.body.email);

    if (!usuario) throw AppError.badRequestError("No existe un usuario con el email ingresado");

    console.log(usuario);

    const token = jwt.sign({ usuario }, process.env.SECRET as string, { expiresIn: "1d" });

    return response.status(201).json(token);
}

export const solicitarEmpresa = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
    if (!validator.isEmail(request.body.email)) throw AppError.badRequestError("El email ingresado no es valido");

    if (await usuariosService.getByEmail(request.body.email)) throw AppError.badRequestError("Ya existe un usuario con el email ingresado");

    const result = await empresasService.post(request.body);

    const token = jwt.sign({ usuario: result }, process.env.SECRET as string, { expiresIn: "1d" });

    return response.status(201).json(token);
}