
import { BaseEntity, Column,Entity,JoinColumn,OneToOne,ManyToOne,PrimaryGeneratedColumn,PrimaryColumn, ManyToMany  } from "typeorm";
import { Empresa } from "./empresa.model";
//import  {  TipoDocumento} from "./enums";
//import { Usuario } from "./usuario.model";
//import { Localidad } from "./localidad.model";
///import { TimerOptions } from "timers";
import { AreaDeTrabajo } from "../models/enums";
import { EstadoOfferta } from "./enums";
import { Postulante } from "./postulante.model";
//import {Empresa} from "./empresa.model";
@Entity("offerta")
export class Offerta extends BaseEntity
{

    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(() => Empresa)
    empresa:Empresa;


    @Column()
    telefonoContacto:number;
 
    @Column()
    emailContacto:string
 
 
    @Column()
    vacantes:string;
 
    
    
   @Column({
    type: "enum",
    enum: EstadoOfferta,
    default: EstadoOfferta.Vigente
})
estadoOfferta: EstadoOfferta;
 
 
   
 

 
 @Column({type:"text"})
 requisitosValorados:string;
 
 
 

    
 @ManyToMany(() => Postulante)
 @JoinColumn()
 Postulantes:Postulante[];


 
 


 @Column({
    type: "enum",
    enum:AreaDeTrabajo,
    default: AreaDeTrabajo.Alimentos
})
areaDeTrabajo: AreaDeTrabajo;
 
     @Column({nullable:true })
     nombreOfferta:string;
     
 
     @Column({ type:"text"})
     descripcion:string;
     
     @Column()
     puesto:string;
 
     
 
 
  
     @Column()
     funcionesDePuesto:string;

     @Column()
     requisitosExcluyente:string;
    
     
    @Column()
    horariodetrabajo:string;

     @Column()
     rangoSalario:String;

     

     @Column()
     fechaPublicacion:Date;
      
     @Column()
     fechaCierre:Date; 
     
}