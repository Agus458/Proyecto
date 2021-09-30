import { BaseEntity, Column,Entity, ManyToOne, OneToOne,JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Sexo,MaximoNivelEducactivo, Nivel_Jerarquico, AreaORubro} from "./enums";
import { ReferenciaLaboral } from "./ReferenciaLaboral.model";
//import { Domicilio } from "./domicilio.model";

@Entity("ExperienciaLaboral")
export class Experiencia extends BaseEntity
{
@Column()
NombreDeLaEmpresa:String

@Column()
CargoQueOcupo:String

@Column({
    type: "enum",
    enum: AreaORubro,
    default: AreaORubro["---"]
})
AreaORubro: AreaORubro;

@Column({
    type: "enum",
    enum: Nivel_Jerarquico,
    default: Nivel_Jerarquico.Empleado
})
Nivel_Jerarquico: Nivel_Jerarquico;


@Column()
TareasRealizadas:string;

@Column()
Desde:Date;
hasta:Date;

@OneToMany(() => ReferenciaLaboral, ReferenciaLaboral => ReferenciaLaboral)
ReferenciaLaboral: ReferenciaLaboral;



}