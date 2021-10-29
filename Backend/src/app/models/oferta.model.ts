import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, OneToMany, DeleteDateColumn } from "typeorm";
import { Empresa } from "./empresa.model";
import { AreaTematica } from "./perfil/area-tematica";
import { PostulanteOferta } from "./postulante-oferta.model";
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

    @OneToMany(() => PostulanteOferta, postulante => postulante.oferta, { cascade: true })
    postulantes: PostulanteOferta[];

    @ManyToOne(() => AreaTematica)
    areaDeTrabajo: AreaTematica;

    @Column({ nullable: true })
    nombreOfferta: string;

    @Column({ type: "text" })
    descripcion: string;

    @Column()
    puesto: string;

    @Column({ type: "text" })
    funcionesDePuesto: string;

    @Column()
    lugarTrabajo: string;

    @Column({ type: "text" })
    requisitosExcluyente: string;

    @Column()
    horariodetrabajo: string;

    @Column()
    rangoSalario: string;

    @CreateDateColumn()
    fechaPublicacion: Date;

    @Column()
    fechaCierre: Date;

    @DeleteDateColumn()
    deletedDate?: Date;
}