import { Column,Entity,JoinColumn,OneToOne } from "typeorm";
//import  {  TipoDocumento} from "./enums";
import { Usuario } from "./usuario.model";
import { Localidad } from "./localidad.model";
import { TimerOptions } from "timers";

@Entity("offerta")
export class Offerta extends Usuario
{

/*
    @Column()
    RutEmpresa:string;
    */
   /*
    @Column()
    RazonSocial:string;
*/
   @Column()
   TelefonoContacto:number;

   @Column()
   EmailContacto:string

   @Column()
   Vacantes:Number;



   @Column()
FuncionesDePuesto:string;

@Column()
RequisitosExcluyente:string;

@Column()
RequisitosValorados:string;
/*
@Column()
HorarioDeTrabajo:TimerOptions;
*/
@Column()
RangoSalario:String;

    /*
@OneToOne(() => Domicilio,LugarDeTrabajo => LugarDeTrabajo.localidad)
@JoinColumn()
LugarDeTrabajo:Domicilio;

*/

    @Column({nullable:true })
    nombreOfferta:string;
    @Column({ nullable:true})
    nombreEmpresa:string;

    @Column({ nullable: true})
    descripcion:string;
    
    @Column()
    puesto:string;

    
    @Column()
    fechaLimite:Date;

    @Column()
    fechaPublicacion:Date;

    @Column()
    fechaCierre:Date;
  

    
    
 
    
    
    
    @OneToOne(() =>Localidad,Localidad => Localidad)
    @JoinColumn()
    localidad:Localidad;

    
        


    @Column({nullable: true})
    CantidaddeEmpleados:number;

 
/*
    @Column()
    Titulo:string;
    */
/*
    @Column()
    Descripcion:Text;
    */

   
/*
    @Column()
    Cargo:string;
*/


    /*
    @Column()
    Expira:Date;
    */
    

    /*
    @OneToOne(() => jornadaLaboral, jornadaLaboral => jornadaLaboral)
    jornadaLaboral: jornadaLaboral;
    */
    //@OneToOne(()=> , )
    
    

    
}