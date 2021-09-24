import { NextFunction, Request, Response } from "express";
import { Empresa } from "../models/empresa.model";

export const esEmpresa = async (request: Request, response: Response, next: NextFunction) => {
    if(request.user && request.user instanceof Empresa){
        return next();
    }
    
    return response.status(403).json({ message: "Acceso Denegado", status: 403 });
}