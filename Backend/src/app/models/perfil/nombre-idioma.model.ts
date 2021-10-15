import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nombres-idiomas")
export class NombreIdioma extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

}