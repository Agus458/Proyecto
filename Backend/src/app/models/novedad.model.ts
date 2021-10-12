import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('novedades')
export class Novedad extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    imagen: string;

    @Column({ type: "text" })
    contenido: string;

    @CreateDateColumn()
    fechaPublicacion: Date;

}