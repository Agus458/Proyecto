import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoPermiso } from "./perfil/tipo-permiso.model";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< PERMISO MODEL >--------------------------------------- */

@Entity('permisos')
export class Permiso extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TipoPermiso)
    tipoDocumento: TipoPermiso;

    @Column()
    vigencia: Date;

    @Column({ nullable: true })
    especificacion: string;

    @ManyToOne(() => Postulante, postulante => postulante.permisos)
    postulante: Postulante;

}