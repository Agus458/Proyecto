import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< EXPERIENCIA LABORAL MODEL >--------------------------------------- */

@Entity('experiencias-laborales')
export class ExperienciaLaboral extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreEmpresa: string;

    @Column()
    cargo: string;

    @Column()
    rubro: string;

    @Column()
    nivelJerarquico: string;

    @Column({ nullable: true })
    tareasRealizadas: string;

    @Column()
    fechaInicio: Date

    @Column({ nullable: true })
    fechaFin: Date;

    @Column()
    trabajando: boolean;

    @Column({ nullable: true })
    nombreReferencia: string;

    @Column({ nullable: true })
    apellidoReferencia: string;

    @Column({ nullable: true })
    cargoReferencia: string;

    @Column({ nullable: true })
    telefonoReferencia: string;

    @Column({ nullable: true })
    emailReferencia: string;

    @ManyToOne(() => Postulante, postulante => postulante.experienciasLaborales)
    postulante: Postulante;

}