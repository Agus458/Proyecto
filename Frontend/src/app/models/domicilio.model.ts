import { Departamento } from "./departamento.model";
import { Localidad } from "./localidad.model";
import { Pais } from "./pais.model";
import { Postulante } from "./postulante.model";

export interface Domicilio {

    id: number;

    barrio: string;

    direccion: string;

    pais: Pais | any;

    departamento: Departamento | any;

    localidad: Localidad | any;

    postulante: Postulante;

}