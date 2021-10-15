import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaConocimiento } from "./perfil/categoria-conocimiento.model";
import { Postulante } from "./postulante.model";

/* ---------------------------------------< CONOCIMIENTO INFORMATICO MODEL >--------------------------------------- */

@Entity('conocimientos-informaticos')
export class ConocimientoInformatico extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreAplicacion: string;

    @ManyToOne(() => CategoriaConocimiento)
    categoria: CategoriaConocimiento;

    @Column()
    nivelConocimiento: string;

    @ManyToOne(() => Postulante, postulante => postulante.conocimientosInformaticos)
    postulante: Postulante;

}