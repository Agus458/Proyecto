import { Request, Response } from "express";
import * as empresaService from "../services/empresas.service";



export const putEmpresa = async(request: Request, response:Response):Promise<Response> =>{

    empresaService.put(request.user.id, request.body);

    return response.status(200).json();


}

