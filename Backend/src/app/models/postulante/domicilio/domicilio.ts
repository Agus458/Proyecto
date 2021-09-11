import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "../postulante.model";
import { Departamento } from "./departamento";
import { Localidad } from "./localidad";
import { Pais } from "./pais";

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

}