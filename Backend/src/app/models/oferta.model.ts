import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { Empresa } from "./empresa.model";
import { AreaTematica } from "./perfil/area-tematica";
import { Postulante } from "./postulante.model";

@Entity("ofertas")
export class Oferta extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Empresa, empresa => empresa.ofertas)
    empresa: Empresa;

    @Column()
    telefonoContacto: string;

    @Column()
    emailContacto: string

    @Column()
    vacantes: number;

    @Column({ type: "text" })
    requisitosValorados: string;

    @ManyToMany(() => Postulante, postulante => postulante.ofertas, { cascade: true })
    @JoinTable()
    postulantes: Postulante[];

    @ManyToOne(() => AreaTematica)
    areaDeTrabajo: AreaTematica;

    @Column({ nullable: true })
    nombreOfferta: string;

    @Column({ type: "text" })
    descripcion: string;

    @Column()
    puesto: string;

    @Column()
    funcionesDePuesto: string;

    @Column({ type: "text" })
    requisitosExcluyente: string;

    @Column()
    horariodetrabajo: string;

    @Column()
    rangoSalario: String;

    @CreateDateColumn()
    fechaPublicacion: Date;

    @Column()
    fechaCierre: Date;
}