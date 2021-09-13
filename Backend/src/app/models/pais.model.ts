import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "./departamento.model";
import { Domicilio } from "./domicilio.model";

@Entity("paises")
export class Pais extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Departamento, departamento => departamento.pais)
    departamentos: Departamento[];

    @OneToMany(() => Domicilio, domicilio => domicilio.pais)
    domicilios: Domicilio[];

}