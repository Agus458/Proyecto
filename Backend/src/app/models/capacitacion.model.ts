import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AreaTematica } from "./perfil/area-tematica";
import { Estado } from "./perfil/estado";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< CAPACITACION MODEL >--------------------------------------- */

@Entity('capacitaciones')
export class Capacitacion extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreCurso: string

    @ManyToOne(() => AreaTematica)
    areaTematica: AreaTematica;

    @Column()
    institucion: string;

    @Column()
    anioInicio: string;

    @Column()
    duracion: string;

    @Column()
    tipoDuracion: string;

    @ManyToOne(() => Estado)
    estadoCurso: Estado;

    @ManyToOne(() => Postulante, postulante => postulante.capacitaciones)
    postulante: Postulante;

}