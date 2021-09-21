import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< PERMISO MODEL >--------------------------------------- */

@Entity('permisos')
export class Permiso extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoDocumento: string;

    @Column()
    vigencia: Date;

    @Column({ nullable: true })
    especificacion: string;

    @ManyToOne(() => Postulante, postulante => postulante.permisos)
    postulante: Postulante;

}