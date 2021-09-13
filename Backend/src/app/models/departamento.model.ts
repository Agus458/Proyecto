import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Domicilio } from "./domicilio.model";
import { Localidad } from "./localidad.model";
import { Pais } from "./pais.model";

@Entity("departamentos")
export class Departamento extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Pais, pais => pais.departamentos)
    pais: Pais;

    @OneToMany(() => Localidad, localidad => localidad.departamento)
    localidades: Localidad[];

    @OneToMany(() => Domicilio, domicilio => domicilio.departamento)
    domicilios: Domicilio[];

}