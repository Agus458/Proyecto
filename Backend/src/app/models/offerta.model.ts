import { Column,Entity,JoinColumn,OneToMany,OneToOne } from "typeorm";
import {MaximoNivelEducactivo, TipoDocumento,} from "./enums";
import { Usuario } from "./usuario.model";
import { Domicilio } from "./domicilio.model";
import { Educacion } from "./Educacion.model";
import { jornadaLaboral } from "./JornadaLaboral.model";
import internal from "stream";
import { informatico } from "./Informatico.model";
import { Curso } from "./Curso.model";
import { SelectQueryBuilderOption } from "typeorm/query-builder/SelectQueryBuilderOption";
import { Idioma } from "../models/Idioma.Model";

@Entity("offerta")
export class Offerta extends Usuario
{
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

    @Column({ nullable:true })
    nivelEducativo:string

    
    @Column({nullable: true})
    fechaLimite:Date;

  

    
    
    @Column({
        type: "enum",
        enum: MaximoNivelEducactivo,
        default:MaximoNivelEducactivo.BachilleratoLiceo,

    })
    NivelEducativoPedido:MaximoNivelEducactivo;


    
    
    
    @OneToOne(() => Domicilio,domicilio => domicilio.Empresa)
    @JoinColumn()
    domicilio:Domicilio;

        
    @Column({nullable: true})
    jornadaLaboral:String;

    @Column({nullable: true})
    CantidaddeEmpleados:number;

    @Column({nullable:true})
    Autor:String;

    @Column({nullable:true})
    BuscandoPersonas:Boolean;

    @Column()
    Titulo:string;

    @Column()
    Descripcion:Text;

    @OneToMany(()=> informatico,informatico => informatico)
    @JoinColumn()
    RequerimientosTecnicos:informatico;
/*
    @Column()
    Cargo:string;
*/

    @OneToMany(()=> Idioma,Idioma => Idioma)
    @JoinColumn()
    Idiomas:Idioma;



    


    /*
    @OneToOne(() => jornadaLaboral, jornadaLaboral => jornadaLaboral)
    jornadaLaboral: jornadaLaboral;
    */
    //@OneToOne(()=> , )
    
    

    
}