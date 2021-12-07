import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Localidad } from "./localidad.model";
import { Oferta } from "./oferta.model";
import { Usuario } from "./usuario.model";

/* ---------------------------------------< EMPRESA MODEL >--------------------------------------- */

@Entity('empresas')
export class Empresa extends Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    rut: string;

    @Column({ nullable: true })
    vencimiento: Date;

    @Column({ nullable: true })
    razonSocial: string;

    @Column({ nullable: true })
    socia: boolean;

    @Column({ nullable: true })
    telefono: string

    @ManyToOne(() => Localidad)
    localidad: Localidad;

    @Column({ default: false })
    visibilidad: boolean;

    @Column({ nullable: true })
    nombreFantasia: string;

    @OneToMany(() => Oferta, oferta => oferta.empresa)
    ofertas: Oferta[];

    @CreateDateColumn()
    createdDate: Date;
    
}