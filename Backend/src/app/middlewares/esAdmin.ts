import { NextFunction, Request, Response } from "express";
import { Administrador } from "../models/administrador.model";

export const esPostulante = async (request: Request, response: Response, next: NextFunction) => {
    if(request.user && request.user instanceof Administrador){
        return next();
    }
    
    return response.status(403).json({ message: "Acceso Denegado", status: 403 });
}