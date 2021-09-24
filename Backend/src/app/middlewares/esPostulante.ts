import { NextFunction, Request, Response } from "express";
import { Postulante } from "../models/postulante.model";

export const esPostulante = async (request: Request, response: Response, next: NextFunction) => {
    if(request.user && request.user instanceof Postulante){
        return next();
    }
    
    return response.status(403).json({ message: "Acceso Denegado", status: 403 });
}