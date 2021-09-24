import { Departamento } from "./departamento.model";

export interface Localidad {
    
    id: number;

    nombre: string;

    departamento: Departamento;
    
}