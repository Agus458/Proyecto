import { BaseEntity, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { Oferta } from "./oferta.model";
import { Postulante } from "./postulante.model";

@Entity("postulantes-ofertas")
export class PostulanteOferta extends BaseEntity {

    @ManyToOne(() => Oferta, oferta => oferta.postulantes, { primary: true })
    oferta: Oferta

    @ManyToOne(() => Postulante, postulante => postulante.ofertas, { primary: true })
    postulante: Postulante

    @CreateDateColumn()
    createdDate: Date;

}