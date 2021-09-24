import { Column, BaseEntity,Entity, JoinColumn,OneToOne} from "typeorm";
import {TipoDeDocumentoYLicencia} from './enums'
@Entity("PermisosYLicencias")
export class PermisosYLicencias extends BaseEntity
{

    @Column({
        type: "enum",
        enum: TipoDeDocumentoYLicencia,
        default: TipoDeDocumentoYLicencia.Carne_Cuida_coches
    })
    tipoDocumento: TipoDeDocumentoYLicencia;
 
    @Column()
    Vigencia:Date;
    

    @Column()
    Especificacion:string;
    
}