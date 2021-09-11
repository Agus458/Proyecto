import { Administrador } from "../models/administrador.model";
import { Empresa } from "../models/empresa.model";
import { Postulante } from "../models/postulante/postulante.model";
import * as postulantesService from "./postulantes.service";
import * as empresasService from "./empresas.service";

export const getByEmail = async (email: string): Promise<Postulante | Empresa | Administrador | undefined> => {
    const usuario = undefined;
    
    let aux: Postulante | Empresa | Administrador | undefined;

    aux = await postulantesService.getByEmail(email);
    if(aux) return aux;

    aux = await empresasService.getByEmail(email);
    if(aux) return aux;

    return usuario;
};