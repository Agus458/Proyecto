import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "./departamento";
import { Domicilio } from "./domicilio";

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