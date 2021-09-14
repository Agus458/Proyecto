import { Entity } from "typeorm";
import { Usuario } from "./usuario.model";

/* ---------------------------------------< ADMINISTRADOR MODEL >--------------------------------------- */

@Entity('administradores')
export class Administrador extends Usuario {
    
}