import { Column, Entity } from "typeorm";
import { Usuario } from "./usuario.model";

/* ---------------------------------------< POSTULANTE MODEL >--------------------------------------- */

@Entity("postulantes")
export class Postulante extends Usuario {

    @Column({ nullable: true })
    primerNombre: string;

    @Column({ nullable: true })
    segundoNombre: string;

    @Column({ nullable: true })
    primerApellido: string;

    @Column({ nullable: true })
    segundoApellido: string;

}