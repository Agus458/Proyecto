import { NextFunction, Request, Response } from "express";
import { Administrador } from "../models/administrador.model";
import { Empresa } from "../models/empresa.model";
import { Postulante } from "../models/postulante.model";

export const tieneRol = (roles: string[]) => (request: Request, response: Response, next: NextFunction) => {
    
    if(roles.find((rol) => rol == "Administrador") && request.user && request.user instanceof Administrador){
        return next();
    }

    if(roles.find((rol) => rol == "Empresa") && request.user && request.user instanceof Empresa){
        return next();
    }

    if(roles.find((rol) => rol == "Postulante") && request.user && request.user instanceof Postulante){
        return next();
    }

    return response.status(403).json({ message: "Acceso Denegado", status: 403 });
}