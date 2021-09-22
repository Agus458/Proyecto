import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< PREFERENCIA LABORAL MODEL >--------------------------------------- */

@Entity('preferencias-laborales')
export class PreferenciaLaboral extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    puestoPreferido: string;

    @Column()
    areasInteres: string;

    @Column()
    aspiracionSalarial: number;

    @ManyToOne(() => Postulante, postulante => postulante.preferenciasLaborales)
    postulante: Postulante;

}