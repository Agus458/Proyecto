import { Column,Entity,JoinColumn,OneToOne } from "typeorm";
//import  {  TipoDocumento} from "./enums";
import { Usuario } from "./usuario.model";
import { Localidad } from "./localidad.model";
import { TimerOptions } from "timers";
import { AreaDeTrabajo } from "../models/enums";
@Entity("offerta")
export class Offerta extends Usuario
{

  
     @Column({ nullable:true})
     nombreEmpresa:string;


    @Column()
    TelefonoContacto:number;
 
    @Column()
    EmailContacto:string
 
    @Column()
    Vacantes:string;
 
    
 
 
   
 

 
 @Column()
 RequisitosValorados:string;
 /*
 @Column()
 HorarioDeTrabajo:TimerOptions;

 
     /*
 @OneToOne(() => Domicilio,LugarDeTrabajo => LugarDeTrabajo.localidad)
 @JoinColumn()
 LugarDeTrabajo:Domicilio;
 
 */


 @Column({
    type: "enum",
    enum:AreaDeTrabajo,
    default: AreaDeTrabajo.Alimentos
})
AreaDeTrabajo: AreaDeTrabajo;
 
     @Column({nullable:true })
     nombreOfferta:string;
     
 
     @Column({ nullable: true})
     descripcion:string;
     
     @Column()
     puesto:string;
 
     
     @Column()
     fechaLimite:Date;
 
  
     @Column()
     FuncionesDePuesto:string;

     @Column()
     RequisitosExcluyente:string;
    

     @Column({nullable: true})
     CantidaddeEmpleados:number;
     
    @Column()
    Horariodetrabajo:string;

     @Column()
     RangoSalario:String;

     @OneToOne(() =>Localidad,lugardetrabajo => lugardetrabajo)
     @JoinColumn()
     Lugardetrabajo:Localidad;

     @Column()
     FechaPublicacion:Date;
      
     @Column()
     FechaCierre:Date;  
}