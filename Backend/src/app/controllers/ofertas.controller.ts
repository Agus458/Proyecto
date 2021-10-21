import { Request, Response } from "express";
import validator from "validator";

import { AppError } from "../../config/error/appError";
import * as ofertasService from "../services/ofertas.service";
import * as empresasService from "../services/empresas.service";
import * as postulantesService from "../services/postulantes.service";
import { Administrador } from "../models/administrador.model";

export const getOffertas = async (request: Request, response: Response): Promise<Response> => {
    const offerta = await ofertasService.get();

    return response.status(200).json(offerta);
}

export const getAllOffertas = async (request: Request, response: Response): Promise<Response> => {
    const offerta = await ofertasService.getAll();

    return response.status(200).json(offerta);
}

export const getOffertaById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la offerta");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de offerta invalido");

    const offerta = await ofertasService.getById(Number.parseInt(request.params.id));

    if (!offerta) throw AppError.badRequestError("No existe ninguna offerta con el id ingresado");

    return response.status(200).json(offerta);
}

export const getOffertaByEmpresa = async (request: Request, response: Response): Promise<Response> => {
    let empresa;
    if (request.user instanceof Administrador) {
        if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la empresa");
        if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de empresa invalido");

        empresa = await empresasService.getById(Number.parseInt(request.params.id));
        if (!empresa) throw AppError.badRequestError("No existe ningun empresa con el id ingresado");
    } else {
        empresa = request.user;
    }

    const offertas = await ofertasService.getByEmpresa(empresa);

    return response.status(200).json(offertas);
}

export const getOffertaByPostulante = async (request: Request, response: Response): Promise<Response> => {
    const offertas = await ofertasService.getPostulaciones(request.user);

    return response.status(200).json(offertas);
}

export const realizarOfferta = async (request: Request, response: Response): Promise<Response> => {
    let empresa;

    if (request.user instanceof Administrador) {
        if(!request.body.empresa) throw AppError.badRequestError("No se ingreso ninguna empresa");

        empresa = await empresasService.getById(request.body.empresa);
        if (!empresa) throw AppError.badRequestError("No existe ningun empresa con el id ingresado");
    } else {
        empresa = await empresasService.getById(request.user.id);
        if (!empresa) throw AppError.badRequestError("No existe ningun empresa con el id ingresado");
    }

    request.body.empresa = empresa;
    await ofertasService.post(request.body);

    return response.status(201).json();
}

export const ActualizarOfferta = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la offerta");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de offerta invalido");

    const oferta = await ofertasService.getById(Number.parseInt(request.params.id));
    if (!oferta) throw AppError.badRequestError("No existe ninguna oferta con el id ingresado");

    await ofertasService.put(oferta.id, request.body);

    return response.status(204).json();
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la offerta");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de offerta invalido");

    const oferta = await ofertasService.getById(Number.parseInt(request.params.id));
    if (!oferta) throw AppError.badRequestError("No existe ninguna oferta con el id ingresado");

    await ofertasService._delete(oferta.id);

    return response.status(204).json();
}

export const inscribirseOfferta = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la offerta");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de offerta invalido");

    const oferta = await ofertasService.getById(Number.parseInt(request.params.id));
    if (!oferta) throw AppError.badRequestError("No existe ninguna oferta con el id ingresado");

    const postulante = await postulantesService.getById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");

    oferta.postulantes.push(postulante);

    await ofertasService.put(oferta.id, oferta);

    return response.status(204).json();
}

export const getPostulantesOferta = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id de la offerta");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("Id de offerta invalido");

    const postulantes = await ofertasService.getPostulantesOferta(Number.parseInt(request.params.id));

    return response.status(200).json(postulantes);
}