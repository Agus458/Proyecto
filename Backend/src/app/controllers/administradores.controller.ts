import { Request, Response } from "express";
import moment from "moment";
import validator from "validator";
import { AppError } from "../../config/error/appError";
import { EstadoUsuario } from "../models/enums";
import * as empresasService from "../services/empresas.service";
import * as ofertasService from "../services/ofertas.service";
import * as postulantesService from "../services/postulantes.service";
import * as novedadesService from "../services/novedades.service";
import { getPreviousMonths } from "../libraries/date.library";

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
    return response.status(200).json({
        "Ofertas":  await ofertasService.getOfertasFiltered(request.query),
        "Postulantes": await postulantesService.getPostulanteFiltered(request.query),
        "Empresas": await empresasService.getEmpresasFiltered(request.query),
        "Novedades": await novedadesService.count(request.query),
        "Postulaciones a Ofertas": await ofertasService.getCantPostulantesOfertas(request.query),
    });
}

export const getChartsData = async (request: Request, response: Response): Promise<Response> => {
    const months = getPreviousMonths();
    
    return response.status(200).json({
        "Ofertas por Mes": await ofertasService.getOfertasByMonth(months),
        "Postulaciones a Ofertas por Mes": await ofertasService.getPostulacionesByMonth(months),
        "Empresas Registradas por Mes": await empresasService.getEmpresasByMonth(months),
        "Postulantes Registrados por Mes": await postulantesService.getPostulantesByMonth(months)
    });
}