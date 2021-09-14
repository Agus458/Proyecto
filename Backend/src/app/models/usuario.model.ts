import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { EstadoUsuario } from "./enums";

/* ---------------------------------------< USUARIO MODEL >--------------------------------------- */

export abstract class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    contrasenia: string;

    @Column({ type: "enum", enum: EstadoUsuario })
    estado: EstadoUsuario;

}