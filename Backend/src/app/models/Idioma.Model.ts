import { BaseEntity, Column,Entity,JoinColumn,OneToOne } from "typeorm";
import { idiomas, nivel } from "./enums";

@Entity("Idiomas")
export class Idiomas extends BaseEntity
{

    @Column()
    Otro:string;

    @Column({
        type: "enum",
        enum: idiomas,
        default: idiomas.Español
    })
    idiomas:idiomas;
    @Column({
        type: "enum",
        enum: nivel,
        default: nivel.No
    })
   Habla_Conversacion:nivel;

   @Column({
    type: "enum",
    enum: nivel,
    default: nivel.No
    })
    comprension_Lectora:nivel;

    @Column({
        type: "enum",
        enum: nivel,
        default: nivel.No
        })
        Escritura:nivel;
    
       
   
}