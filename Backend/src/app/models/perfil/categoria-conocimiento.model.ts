import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categorias-conocimientos")
export class CategoriaConocimiento extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

}