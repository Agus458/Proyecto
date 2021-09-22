import { Column, BaseEntity,Entity, JoinColumn,OneToOne} from "typeorm";
import { MaximoNivelEducactivo, Estado, } from "./enums";

@Entity("Educacion")
export class Educacion extends BaseEntity {
    
    @Column({
        type: "enum",
        enum: MaximoNivelEducactivo,
        default: MaximoNivelEducactivo["---"]
    })
    MaximoNivelEducativo:MaximoNivelEducactivo;

    @Column({
        type: "enum",
        enum: Estado,
        default: Estado.Cursado
    })
    Estado:Estado;
    
    

}
