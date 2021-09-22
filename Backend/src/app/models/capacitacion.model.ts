import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< CAPACITACION MODEL >--------------------------------------- */

@Entity('capacitaciones')
export class Capacitacion extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreCurso: string

    @Column()
    areaTematica: string;

    @Column()
    institucion: string;

    @Column()
    añoInicio: string;

    @Column()
    duracion: string;

    @Column()
    tipoDuracion: string;

    @Column()
    estadoCurso: string;

    @ManyToOne(() => Postulante, postulante => postulante.capacitaciones)
    postulante: Postulante;

}