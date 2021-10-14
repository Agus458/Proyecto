
import { BaseEntity, Column,Entity,JoinColumn,OneToOne,ManyToOne,PrimaryGeneratedColumn,PrimaryColumn  } from "typeorm";
import { Empresa } from "./empresa.model";
//import  {  TipoDocumento} from "./enums";
//import { Usuario } from "./usuario.model";
//import { Localidad } from "./localidad.model";
///import { TimerOptions } from "timers";
import { AreaDeTrabajo } from "../models/enums";
import { EstadoOfferta } from "./enums";
//import {Empresa} from "./empresa.model";
@Entity("offerta")
export class Offerta extends BaseEntity
{

    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(() => Empresa)
    empresa:Empresa;


    @Column()
    TelefonoContacto:number;
 
    @Column()
    EmailContacto:string
 
 
    @Column()
    Vacantes:string;
 
    
    
   @Column({
    type: "enum",
    enum: EstadoOfferta,
    default: EstadoOfferta.Vigente
})
EstadoOfferta: EstadoOfferta;
 
 
   
 

 
 @Column({type:"text"})
 RequisitosValorados:string;
 
 
 @Column()
 HorarioDeTrabajo:string;

 
 
 
 


 @Column({
    type: "enum",
    enum:AreaDeTrabajo,
    default: AreaDeTrabajo.Alimentos
})
AreaDeTrabajo: AreaDeTrabajo;
 
     @Column({nullable:true })
     nombreOfferta:string;
     
 
     @Column({ type:"text"})
     descripcion:string;
     
     @Column()
     puesto:string;
 
     
 
 
  
     @Column()
     FuncionesDePuesto:string;

     @Column()
     RequisitosExcluyente:string;
    
     
    @Column()
    Horariodetrabajo:string;

     @Column()
     RangoSalario:String;

     

     @Column()
     FechaPublicacion:Date;
      
     @Column()
     FechaCierre:Date; 
     
}