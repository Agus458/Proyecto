import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../libraries/tokens.library";
import * as usuariosService from "../services/usuarios.service";

/* ---------------------------------------< LOGGED IN MIDDLEWARE >--------------------------------------- */

export const isLoggedIn = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    // Verifica que se haya mandado un token de autorizacion.
    if (authHeader && authHeader.startsWith("Bearer")) {

        const bearer = authHeader.split(" ");
        const token = bearer[1];

        if (token) {

            const payload: any = verifyToken(token, process.env.SECRET as string);

            // Verifica que el token sea valido.
            if (payload && payload.email) {
                let usuario = await usuariosService.getByEmail(payload.email);

                if (usuario) {
                    request.user = usuario;
                    return next();
                }

            }

        }

    }

    return response.status(403).json({ message: "Acceso Denegado", status: 403 });
}