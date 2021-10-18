import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tipos-permisos")
export class TipoPermiso extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

}