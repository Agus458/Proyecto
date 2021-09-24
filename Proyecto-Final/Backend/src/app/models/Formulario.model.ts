import {  Column,Entity, ManyToOne, OneToOne,JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Idiomas } from "./Idioma.Model";
import { Experiencia} from "./ExperienciaLaboral.model"
import { jornadaLaboral } from "./JornadaLaboral.model";
import { PermisosYLicencias } from "./PermisosYLicensias.Module";
import { informatico } from "./Informatico.model";
import { ReferenciaLaboral } from "./ReferenciaLaboral.model";
import { Postulante } from "./postulante.model";
import { Educacion } from "./Educacion.model";



 export class Formulario  
 {

    

    
    
/*
    @Column({nullable: true})
     primerNombre:string;
*/

     @OneToOne(() => Postulante,postulante => postulante )
     @JoinColumn()
     postulante:Postulante;


     @OneToMany(() =>Idiomas, idiomas => idiomas)
     @JoinColumn()
     idiomas:Idiomas;
     
     @OneToMany(() => Experiencia, Experiencia => Experiencia)
     @JoinColumn()
     ExperienciaLaboral:Experiencia;

     @OneToMany(() => jornadaLaboral, jornadaLaboral => jornadaLaboral)
     @JoinColumn()
     jornadaLaboral:jornadaLaboral;

    @OneToMany(() => PermisosYLicencias, PermisosYLicencias => PermisosYLicencias)
    @JoinColumn()
    PermisosYLicencias:PermisosYLicencias;

    @OneToMany(() => informatico, informatico => informatico)
    @JoinColumn()
    Informatico:informatico;

    @OneToMany(() => ReferenciaLaboral, ReferenciaLaboral => ReferenciaLaboral)
    @JoinColumn()
    ReferenciaLaboral:ReferenciaLaboral;

    @OneToMany(() => Educacion, Educacion => Educacion)
    @JoinColumn()
    Educacion:Educacion;




     
     /*
     @Column({nullable: true})
     primerNombre:string;

     @Column({nullable:true})
    */



    /*
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
    
    */
 




    
    //@Column({nullable: true})



 }