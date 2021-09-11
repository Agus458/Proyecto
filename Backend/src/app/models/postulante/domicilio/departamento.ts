import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Domicilio } from "./domicilio";
import { Localidad } from "./localidad";
import { Pais } from "./pais";

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