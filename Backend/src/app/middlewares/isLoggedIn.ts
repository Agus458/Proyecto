import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { AppError } from "../../config/error/appError";
import { verifyToken } from "../libraries/tokens.library";
import { Empresa } from "../models/empresa.model";
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
                    if (usuario.constructor.toString() == "Empresa") {
                        const empresa: Empresa = usuario as Empresa;
                        if (moment().isAfter(moment(empresa.vencimiento))) {
                            return response.status(403).json({ message: "La fecha de utlizacion ya expiro", status: 403 });
                        }
                    }

                    request.user = usuario;
                    return next();
                }

            }

        }

    }

    return response.status(403).json({ message: "Acceso Denegado", status: 403 });
}