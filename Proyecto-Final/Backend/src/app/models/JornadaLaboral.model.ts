import { BaseEntity, Column, Double, Entity, JoinColumn, OneToOne } from "typeorm";
import{AreasDeInteresLaboral} from './enums';

@Entity("jornadaLaboral")
export class  jornadaLaboral extends BaseEntity
{
    @Column()
    indiferente:Boolean;

    @Column()
    completo:boolean;

    @Column()
    mediaTurnoMañana:boolean;

    @Column()
    medioTurnoNoche:boolean;

    @Column()
    medioTurnoTarde:boolean;

    @Column()
    Puesto_preferido:String;

    @Column()
    AreaDeInteres:AreasDeInteresLaboral;

    @Column()
    AspiracionSalarialNominal:Double;
    
}
