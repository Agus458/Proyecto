import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("niveles-jerarquicos")
export class NivelJerarquico extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
}