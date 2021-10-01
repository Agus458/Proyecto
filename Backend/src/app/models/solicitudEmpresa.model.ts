import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('solicitudes-empresas')
export class SolicitudEmpresa extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rut: string;

    @Column()
    token: string;
    
}