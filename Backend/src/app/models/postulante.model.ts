import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Sexo, TipoDocumento } from "./enums";
import { Usuario } from "./usuario.model";
import { Domicilio } from "./domicilio.model";

/* ---------------------------------------< POSTULANTE MODEL >--------------------------------------- */

@Entity("postulantes")
export class Postulante extends Usuario {

    @Column({ nullable: true })
    primerNombre: string;

    @Column({ nullable: true })
    segundoNombre: string;

    @Column({ nullable: true })
    primerApellido: string;

    @Column({ nullable: true })
    segundoApellido: string;

    @Column({ nullable: true })
    imagen: string;

    @OneToOne(() => Domicilio, domicilio => domicilio.postulante)
    @JoinColumn()
    domicilio: Domicilio;

    @Column({
        type: "enum",
        enum: TipoDocumento,
        default: TipoDocumento.CI
    })
    tipoDocumento: TipoDocumento;

    @Column({ nullable: true, unique: true })
    documento: string;

    @Column({
        type: "enum",
        enum: Sexo,
        default: Sexo.OTRO
    })
    sexo: Sexo;

    @Column({ nullable: true })
    fechaNacimiento: Date;

    @Column({ nullable: true })
    primerTelefono: number;

    @Column({ nullable: true })
    segundoTelefono: number;

    @Column({ nullable: true })
    nivelEducativo: string;

    @Column({ nullable: true })
    estadoNivelEducativo: string;

    @Column({ nullable: true })
    orientacion: string;

    @Column({ nullable: true })
    recivirEmails: boolean;

    @Column({ nullable: true })
    perfilPublico: boolean;

}