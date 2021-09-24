import { Departamento } from "./departamento.model";

export interface Pais {
    
    id: number;

    nombre: string;

    departamentos: Departamento[];
    
}