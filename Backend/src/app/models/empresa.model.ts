import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Domicilio } from "./domicilio.model";
import { Usuario } from "./usuario.model";

/* ---------------------------------------< EMPRESA MODEL >--------------------------------------- */

@Entity('empresas')
export class Empresa extends Usuario {

    @Column({ unique: true })
    rut: number;

    @Column({ nullable: true })
    vencimiento: Date;

    @Column({ nullable: true })
    razonSocial: string;

    @Column({ nullable: true })
    socia: boolean;

    @OneToOne(() => Domicilio, domicilio => domicilio.Empresa)
    @JoinColumn()
    domicilio: Domicilio;

}