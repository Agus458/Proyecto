import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("areas-tematicas")
export class AreaTematica extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
}