import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("niveles-educativos")
export class NivelEducativo extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
}