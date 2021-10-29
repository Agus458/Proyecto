import fs from "fs";
import { NextFunction, Request, Response } from "express";
import path from "path";

import { baseDir } from "../app.server";
import * as postulantesService from "../services/postulantes.service";
import validator from "validator";
import { Administrador } from "../models/administrador.model";
import * as ofertasService from "../services/ofertas.service";
import { Empresa } from "../models/empresa.model";

export const esPublico = async (request: Request, response: Response, next: NextFunction) => {
    const url = request.baseUrl + request.url;
    const fileName = request.url.split("/").pop();
    const filePath = path.join(baseDir + "/../../" + url);

    if (!fs.existsSync(filePath)) return response.status(404).json({ message: "Archivo no encontrado", status: 404 });

    const id = fileName?.split("-")[0];

    if (id && validator.isInt(id)) {
        const perfil = await postulantesService.getPerfilById(Number.parseInt(id));

        if (id == request.user.id || (perfil && (perfil.perfilPublico || request.user instanceof Administrador || (request.user instanceof Empresa && await ofertasService.postuladoAEmpresa(request.user.id, perfil.id))))) return next();
    }

    return response.status(404).json({ message: "Este archivo es privado", status: 404 });
}