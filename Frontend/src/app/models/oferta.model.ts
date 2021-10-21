import { Empresa } from "./empresa.model";
import { Postulante } from "./postulante.model";

export interface Oferta {
    
    id?: number;

    empresa?: any;

    telefonoContacto?: number;

    emailContacto?: string

    vacantes?: number;

    requisitosValorados?: string;

    postulantes?: Postulante[];

    areaDeTrabajo?: any;

    nombreOfferta?: string;

    descripcion?: string;

    puesto?: string;

    funcionesDePuesto?: string;

    requisitosExcluyente?: string;

    horariodetrabajo?: string;

    rangoSalario?: String;

    fechaPublicacion?: Date;

    fechaCierre?: Date;

}