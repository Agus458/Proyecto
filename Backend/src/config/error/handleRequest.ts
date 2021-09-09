import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";

export const handleRequest = (_function: Function) => async (request: Request, response: Response, next: NextFunction) => {

    try {
        await _function(request, response);
    } catch (error) {
        
        try {
            const aux: AppError = error as AppError;
            return response.status(aux.code).json({ message: aux.message, status: aux.code });
        } catch (error) {  
        }

        console.log(error);

        return response.status(500).json({ message: "Algo salió mal", status: 500 });
    }

}