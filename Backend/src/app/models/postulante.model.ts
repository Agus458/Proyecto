import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { TipoDocumento } from "./enums";
import { Usuario } from "./usuario.model";
import { Domicilio } from "./domicilio.model";
import { Capacitacion } from "./capacitacion.model";
import { ConocimientoInformatico } from "./conocimiento-informatico.model";
import { Idioma } from "./idioma.model";
import { ExperienciaLaboral } from "./experiencia-laboral.model";
import { PreferenciaLaboral } from "./preferenciaLaboral.model";
import { Permiso } from "./permiso.model";

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

    // Almacena el path hasta el archivo de la imagen del Postulante.
    @Column({ nullable: true })
    imagen: string;

    // Almacena el path hasta el archivo del cv del Postulante.
    @Column({ nullable: true })
    cv: string;

    @OneToOne(() => Domicilio, domicilio => domicilio.postulante, { cascade: true })
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

    @Column({ nullable: true })
    sexo: string;

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

    @Column({nullable: true})
    jornadaIndiferente: boolean;

    @Column({nullable: true})
    jornadaCompleta: boolean;

    @Column({nullable: true})
    jornadaManiana: boolean;

    @Column({nullable: true})
    jornadaTarde: boolean;

    @Column({nullable: true})
    jornadaNoche: boolean;

    @OneToMany(() => Capacitacion, capacitacion => capacitacion.postulante)
    capacitaciones: Capacitacion[];

    @OneToMany(() => ConocimientoInformatico, conocimiento => conocimiento.postulante)
    conocimientosInformaticos: ConocimientoInformatico[];

    @OneToMany(() => Idioma, idioma => idioma.postulante)
    idiomas: Idioma[];

    @OneToMany(() => ExperienciaLaboral, experiencia => experiencia.postulante)
    experienciasLaborales: ExperienciaLaboral[];

    @OneToMany(() => PreferenciaLaboral, preferenciaLaboral => preferenciaLaboral.postulante)
    preferenciasLaborales: PreferenciaLaboral[];

    @OneToMany(() => Permiso, permiso => permiso.postulante)
    permisos: Permiso[];

}