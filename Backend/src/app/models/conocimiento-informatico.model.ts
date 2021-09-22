import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< CONOCIMIENTO INFORMATICO MODEL >--------------------------------------- */

@Entity('conocimientos-informaticos')
export class ConocimientoInformatico extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreAplicacion: string;

    @Column()
    categoria: string;

    @Column()
    nivelConocimiento: string;

    @ManyToOne(() => Postulante, postulante => postulante.conocimientosInformaticos)
    postulante: Postulante;

}