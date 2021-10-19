import { Localidad } from "./localidad.model";

export interface Empresa {

    id?: number;

    rut?: number;

    vencimiento?: Date;

    razonSocial?: string;

    socia?: boolean;

    telefono?: string

    localidad?: Localidad;

    visibilidad?: boolean;

    nombreFantasia?: string;

}