import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< IDIOMA MODEL >--------------------------------------- */

@Entity('idiomas')
export class Idioma extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreIdioma: string;

    @Column({ nullable: true })
    especificacion: string;

    @Column()
    habla: string

    @Column()
    comprensionAuditiva: string;

    @Column()
    comprensionLectora: string;

    @Column()
    escritura: string;

    @ManyToOne(() => Postulante, postulante => postulante.idiomas)
    postulante: Postulante;

}