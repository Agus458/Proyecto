import { DeepPartial, getRepository, LessThan } from "typeorm";
import { Empresa } from "../models/empresa.model";
import { Oferta } from "../models/oferta.model";
import { Postulante } from "../models/postulante.model";

export const getAll = async (): Promise<Oferta[]> => {
    return await getRepository(Oferta).find();
};

export const get = async (skip?: number, take?: number): Promise<Oferta[]> => {
    return await getRepository(Oferta).find({
        where: {
            fechaCierre: LessThan(new Date())
        },
        relations: ["empresa"],
        skip,
        take,
        order: {
            fechaPublicacion: "DESC"
        }
    });
};

export const getByEmpresa = async (empresa: Empresa): Promise<Oferta[]> => {
    return await getRepository(Oferta).find({
        where: { empresa },
        relations: ["postulantes"],
        order: {
            fechaPublicacion: "DESC"
        }
    });
}

export const getPostulaciones = async (postulante: Postulante): Promise<Oferta[]> => {
    return await getRepository(Oferta)
    .createQueryBuilder("oferta")
    .leftJoinAndSelect("oferta.postulantes", "postulante")
    .leftJoinAndSelect("oferta.empresa", "empresa")
    .where("postulante.id = :id", {id: postulante.id})
    .orderBy("oferta.fechaPublicacion", "DESC")
    .getMany();
}

export const getById = async (id: number): Promise<Oferta | undefined> => {
    return await getRepository(Oferta).findOne(id, {
        relations: ["areaDeTrabajo"]
    });
};

export const post = async (data: DeepPartial<Oferta>): Promise<Oferta> => {
    const nuevaOferta = getRepository(Oferta).create(data);
    return await getRepository(Oferta).save(nuevaOferta);
}

export const put = async (id: number, data: DeepPartial<Oferta>): Promise<void> => {
    data.id = id;
    await getRepository(Oferta).save(data);
};

export const _delete = async (id: number): Promise<void> => {
    await getRepository(Oferta).delete(id);
};