import { Column, Entity } from "typeorm";
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

}