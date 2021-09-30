import { Column,Entity,JoinColumn,OneToMany,OneToOne } from "typeorm";
import {AreaDeInteres, MaximoNivelEducactivo, TipoDocumento,} from "./enums";
import { Usuario } from "./usuario.model";
import { Domicilio } from "./domicilio.model";
import { Localidad } from "./localidad.model";

@Entity("offerta")
export class Offerta extends Usuario
{


    @Column()
    RutEmpresa:string;
    
    @Column()
    RazonSocial:string;

   @Column()
   TelefonoContacto:number;

   @Column()
   EmailContacto:string

   @Column()
   Vacantes:Number;

     
   @Column({
    type: "enum",
    enum: AreaDeInteres,
    default:AreaDeInteres,

})
AreasDeInteres:AreaDeInteres;

@Column()
FuncionesDePuesto:string;

@Column()
RequisitosExcluyente:string;

@Column()
RequisitosValorados:string;

@Column()
HorarioDeTrabajo:TimeRanges;

@Column()
RangoSalario:String;

    
@OneToOne(() => Domicilio,LugarDeTrabajo => LugarDeTrabajo.Empresa)
@JoinColumn()
LugarDeTrabajo:Domicilio;



    @Column({nullable:true })
    nombreOfferta:string;
    @Column({ nullable:true})
    nombreEmpresa:string;

    @Column({ nullable: true})
    descripcion:string;
    
    @Column({nullable:true})
    puesto:string;

    @Column({nullable:true})
    salario:string;
    
    @Column({nullable: true})
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