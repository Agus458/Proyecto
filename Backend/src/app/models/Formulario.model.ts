import { BaseEntity, Column,Entity, ManyToOne, OneToOne,JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Postulante } from "./postulante.model";
import {Sexo,MaximoNivelEducactivo} from "./enums";
import { Domicilio } from "./domicilio.model";

 export class Formulario 
 {
     
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    NroDocumento: String;

    @Column()
    primerApellido:string;
    
    @Column()
    SegundoApellido:string;
    @Column()
    primerNombre:string;
    @Column()
    SegundoNombre:string;
  
    @Column({
        type: "enum",
        enum: Sexo,
        default: Sexo.OTRO
    })
    sexo: Sexo;
    @Column({ nullable: true })
    fechaNacimiento: Date;
  
    @OneToOne(() => Domicilio,domicilio => domicilio.postulante)
    @JoinColumn()
    domicilio:Domicilio;

    @Column({
        type: "enum",
        enum: MaximoNivelEducactivo,
        default: MaximoNivelEducactivo["---"]
    })
    MaximoNovelEducativo:MaximoNivelEducactivo
    
    
 




    
    //@Column({nullable: true})



 }