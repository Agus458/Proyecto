import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("estados")
export class Estado extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
}