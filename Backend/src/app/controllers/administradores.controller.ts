import { Request, Response } from "express";
import moment from "moment";
import validator from "validator";
import { AppError } from "../../config/error/appError";
import { EstadoUsuario } from "../models/enums";
import * as empresasService from "../services/empresas.service";
import * as ofertasService from "../services/ofertas.service";
import * as postulantesService from "../services/postulantes.service";
import * as novedadesService from "../services/novedades.service";

export const habilitarEmpresa = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la empresa");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de empresa invalido");

    if (typeof request.body.fechaVencimiento != "string" || !Date.parse(request.body.fechaVencimiento)) throw AppError.badRequestError("Fecha de vencimiento invalida. Formato Valido: YYYY-MM-DD");
    const fechaVencimiento = moment(request.body.fechaVencimiento, "YYYY-MM-DD");
    if (fechaVencimiento.isBefore(moment())) throw AppError.badRequestError("Fecha de vencimiento debe ser posterior a la fecha actual");

    const empresa = await empresasService.getById(Number.parseInt(request.params.id));

    if (!empresa) throw AppError.badRequestError("No existe ninguna empresa con el id ingresado");

    if (empresa.estado != EstadoUsuario.PENDIENTE) throw AppError.badRequestError("La empresa seleccionada no esta pendiente");

    empresa.estado = EstadoUsuario.ACTIVO;
    empresa.vencimiento = fechaVencimiento.toDate();

    await empresasService.put(empresa.id, empresa);

    return response.status(204).json();
}

export const getDashboard = async (request: Request, response: Response): Promise<Response> => {
    const ofertas = await ofertasService.getOfertasFiltered(request.query);
    const postulantesOferta = await ofertasService.getCantPostulantesOfertas(request.query);
    const postulantes = await postulantesService.getPostulanteFiltered(request.query);
    const empresas = await empresasService.getEmpresasFiltered(request.query);
    const novedades = await novedadesService.count(request.query);

    return response.status(200).json({ ofertas: ofertas?.length, postulantes, empresas, novedades, postulantesOferta });
}