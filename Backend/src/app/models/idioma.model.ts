import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NombreIdioma } from "./perfil/nombre-idioma.model";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< IDIOMA MODEL >--------------------------------------- */

@Entity('idiomas')
export class Idioma extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => NombreIdioma)
    nombreIdioma: NombreIdioma;

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