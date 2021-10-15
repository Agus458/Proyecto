import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { AppError } from "../../config/error/appError";
import { verifyToken } from "../libraries/tokens.library";
import { Empresa } from "../models/empresa.model";
import { EstadoUsuario } from "../models/enums";
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
                    if (usuario.constructor.name == "Empresa") {
                        const empresa: Empresa = usuario as Empresa;
                        if (moment().isAfter(moment(empresa.vencimiento))) {
                            empresa.estado = EstadoUsuario.INACTIVO;
                            await usuariosService.actualizar(empresa);
                            return response.status(403).json({ message: "La fecha de utlizacion ya expiro", status: 403 });
                        }
                    }

                    request.user = usuario;
                    request.token = token;
                    return next();
                }

            }

        }

    }

    return response.status(403).json({ message: "Acceso Denegado", status: 403 });
}