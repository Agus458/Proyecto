import { Column,Entity } from "typeorm";
import { Departamento } from "./departamento.model";
import { Educacion, Sexo, TipoDeEducacionTercearia} from "./enums";
import { Postulante } from "./postulante.model";
import { Usuario } from "./usuario.model";

@Entity('Curriculum')
export class CV extends Usuario
{

@Column({unique:true})
id: number;
@Column({ nullable: true})
nombre:string;
@Column({ nullable: true})
apellido:string;
@Column({ nullable: true})
email:string;
@Column({ nullable: true})
telefono:number;
@Column({
    type: "enum",
    enum: Sexo,
    default:Sexo.OTRO

})
sexo:Sexo;

@Column({
  type: "enum",
    enum:Educacion,
    default: Educacion.NoDice
})
Educacion:Educacion;


    @Column({
       type:"enum",
        enum:TipoDeEducacionTercearia,
        default:TipoDeEducacionTercearia.NoDice
})
TipodeEducacionTerceario:TipoDeEducacionTercearia;


@Column({
    type:"enum",
    enum:Departamento,
    default:Departamento

})
Departamento:Departamento;
/*
@Column({ nullable: true})
estudios:string;
*/








}



