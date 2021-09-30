import { time } from "console";
import { NextFunction,Request,response,Response } from "express";
import *  as offertaService from "../services/offerta.service"

export const isExpirateDate = async (request: Request, Response:Response,next: NextFunction)=>{
    const data = request.body.data

    if(data.getBySExpira >= Date.now)
    {
        let offerta = await offertaService.getByVsible(false);
  

    if(offerta)
    {
        request.body = offerta;
        return next();
    }
    
}
return response.status(403).json({ message: "no existe la offerta",status: 403});
} 