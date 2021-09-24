import { Request, Response } from "express"

export const notFound = (request: Request, response: Response) => {
    return response.status(404).json({ message: "RUTA NO ENCONTRADA", status: 404 });
}