import { Administrador } from "../models/administrador.model";
import { Empresa } from "../models/empresa.model";
import { Postulante } from "../models/postulante.model";
import * as postulantesService from "./postulantes.service";
import * as empresasService from "./empresas.service";
import * as administradoresService from "./administradores.service";

export const getByEmail = async (email: string): Promise<Postulante | Empresa | Administrador | undefined> => {
    let usuario: Postulante | Empresa | Administrador | undefined;

    usuario = await postulantesService.getByEmail(email);
    if (usuario) return usuario;

    usuario = await empresasService.getByEmail(email);
    if (usuario) return usuario;

    usuario = await administradoresService.getByEmail(email);
    if (usuario) return usuario;

    return usuario;
};

export const getByEmailContrasenia = async (email: string, contrasenia: string): Promise<Postulante | Empresa | Administrador | undefined> => {
    let usuario: Postulante | Empresa | Administrador | undefined;

    usuario = await postulantesService.getByEmailContrasenia(email, contrasenia);
    if (usuario) return usuario;

    usuario = await empresasService.getByEmailContrasenia(email, contrasenia);
    if (usuario) return usuario;

    usuario = await administradoresService.getByEmailContrasenia(email, contrasenia);
    if (usuario) return usuario;

    return usuario;
};