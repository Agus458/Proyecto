import { Request, Response } from "express";
import * as postulantesService from "../services/postulantes.service";

/* ---------------------------------------< POSTULANTES CONTROLLER >--------------------------------------- */

export const putPostulante = async (request: Request, response: Response): Promise<Response> => {
    
    postulantesService.put(request.user.id, request.body);
    
    return response.status(200).json();
}

