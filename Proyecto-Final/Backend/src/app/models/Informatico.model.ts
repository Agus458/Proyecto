import{BaseEntity, Column, Entity} from "typeorm";
import { Categoria, NivelDeConocimiento } from "./enums";
@Entity("informatico")
export class informatico extends BaseEntity
{
    @Column()
    NombreDeLaAplicacion:string;

    @Column({
        type: "enum",
        enum: NivelDeConocimiento,
        default: NivelDeConocimiento.Nivel_Usuario

    })
    NivelDeConocimiento:NivelDeConocimiento

    @Column({
        type: "enum",
        enum: Categoria,
        default: Categoria.Otro

    })
    Categoria:Categoria;

}