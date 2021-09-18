import { BaseEntity, Column,Entity, PrimaryGeneratedColumn} from "typeorm";
import { Estado,AreaDeInteres, Duracion} from "./enums";
@Entity("Curso")
export class Curso extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    nombre: string;
  
   
    
    @Column({
        type: "enum",
        enum: Curso,
        default: Curso,
    })
   Curso:Curso;
    
   @Column({
    type: "enum",
    enum: AreaDeInteres,
    default: AreaDeInteres["---"]
})
AreaDeInteres:AreaDeInteres;

@Column()
InstitucionEducativa:String;

@Column()
AñoDeInicio:Date

@Column()
Duracion:String
@Column({
    type: "enum",
    enum: Duracion,
    default: Duracion,
})
Duracion_Tiempo:Duracion;


@Column({
    type: "enum",
    enum: Estado,
    default: Estado,
})
Estado:Estado;



}