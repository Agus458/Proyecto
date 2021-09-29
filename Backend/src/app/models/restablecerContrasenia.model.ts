import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('restablecimientos-contrasenia')
export class RestablecerContrasenia extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    token: string;
}