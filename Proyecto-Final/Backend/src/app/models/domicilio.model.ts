import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "./postulante.model";
import { Departamento } from "./departamento.model";
import { Localidad } from "./localidad.model";
import { Pais } from "./pais.model";
import { Empresa } from "./empresa.model";

@Entity("domicilios")
export class Domicilio extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    barrio: string;

    @Column()
    direccion: string;

    @ManyToOne(() => Pais, pais => pais.domicilios)
    pais: Pais;

    @ManyToOne(() => Departamento, departamento => departamento.domicilios)
    departamento: Departamento;

    @ManyToOne(() => Localidad, localidad => localidad.domicilios)
    localidad: Localidad;

    @OneToOne(() => Postulante, postulante => postulante.domicilio)
    postulante: Postulante;

    @OneToOne(() => Empresa, Empresa => Empresa.domicilio)
    Empresa:Empresa;

}