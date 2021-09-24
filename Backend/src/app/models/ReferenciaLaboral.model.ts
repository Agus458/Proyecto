import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from "typeorm";


@Entity("ReferenciaLaboral")
export class ReferenciaLaboral extends BaseEntity{

    @Column()
    Nombre:string;

    @Column()
    Apellido:string;

    @Column()
    Cargo:String;

    @Column()
    Telefono_Celular:String;
    
    @Column()
    Correo_Electronico:string;


 
}
