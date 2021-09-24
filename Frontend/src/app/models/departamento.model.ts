import { Localidad } from "./localidad.model";
import { Pais } from "./pais.model";

export interface Departamento {

    id: number;

    nombre: string;

    pais: Pais;

    localidades: Localidad[];
    
}