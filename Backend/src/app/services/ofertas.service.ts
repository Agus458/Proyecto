import moment from "moment";
import { DeepPartial, getRepository, LessThan, MoreThan } from "typeorm";
import { Empresa } from "../models/empresa.model";
import { Oferta } from "../models/oferta.model";
import { Postulante } from "../models/postulante.model";
import validator from "validator";
import { Pagination } from "../models/pagination.mode";

export const getAll = async (skip?: number, take?: number): Promise<Pagination<Oferta>> => {
    const result = await getRepository(Oferta).findAndCount({
        relations: ["areaDeTrabajo", "empresa"]
    });

    return { data: result[0], cantidad: result[1] };
};

export const get = async (skip?: number, take?: number): Promise<Pagination<Oferta>> => {
    const result = await getRepository(Oferta).findAndCount({
        where: {
            fechaCierre: MoreThan(new Date())
        },
        relations: ["empresa", "areaDeTrabajo"],
        skip,
        take,
        order: {
            fechaPublicacion: "DESC"
        }
    });

    return { data: result[0], cantidad: result[1] };
};

export const getByEmpresa = async (empresa: Empresa, skip?: number, take?: number): Promise<Pagination<Oferta>> => {
    const result = await getRepository(Oferta).findAndCount({
        where: { empresa },
        relations: ["areaDeTrabajo"],
        order: {
            fechaPublicacion: "DESC"
        }
    });

    return { data: result[0], cantidad: result[1] };
}

export const getPostulantesOferta = async (id: number): Promise<Pagination<Postulante>> => {
    const result = await getRepository(Postulante)
        .createQueryBuilder("postulante")
        .leftJoin("postulante.ofertas", "postulantesOferta")
        .leftJoin("postulantesOferta.oferta", "oferta")
        .where("oferta.id = :id", { id })
        .getManyAndCount();

    return { data: result[0], cantidad: result[1] };
}

export const getPostulaciones = async (postulante: Postulante, skip?: number, take?: number): Promise<Pagination<Oferta>> => {
    const result = await getRepository(Oferta)
        .createQueryBuilder("oferta")
        .leftJoinAndSelect("oferta.postulantes", "postulantesOferta")
        .leftJoinAndSelect("postulantesOferta.postulante", "postulante")
        .leftJoinAndSelect("oferta.empresa", "empresa")
        .leftJoinAndSelect("oferta.areaDeTrabajo", "area")
        .where("postulante.id = :id", { id: postulante.id })
        .orderBy("oferta.fechaPublicacion", "DESC")
        .getManyAndCount();

    return { data: result[0], cantidad: result[1] };
}

export const getById = async (id: number): Promise<Oferta | undefined> => {
    return await getRepository(Oferta).findOne(id, {
        relations: ["areaDeTrabajo", "empresa", "postulantes"]
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
    await getRepository(Oferta).softDelete(id);
};

export const getOfertasFiltered = async (filters: any): Promise<Oferta[]> => {
    const query = getRepository(Oferta).createQueryBuilder("oferta");

    // Relaciones
    query.leftJoinAndSelect("oferta.empresa", "empresa");
    query.leftJoinAndSelect("oferta.areaDeTrabajo", "areaDeTrabajo");

    // Filtros

    if (filters.desde && Date.parse(filters.desde) && filters.hasta && Date.parse(filters.hasta)) {
        query.where("oferta.fechaPublicacion >= :desde", { desde: new Date(filters.desde) });
        query.andWhere("oferta.fechaCierre <= :hasta", { hasta: new Date(filters.hasta) });
    }

    // Ejecucion

    return await query.getMany();
}

export const getCantPostulantesOfertas = async (filters: any): Promise<number> => {
    let cant = 0;
    const query = getRepository(Oferta).createQueryBuilder("oferta");

    // Relaciones
    query.leftJoinAndSelect("oferta.postulantes", "postulante");
    query.loadRelationCountAndMap("oferta.cant", "oferta.postulantes", "cant");

    // Filtros

    if (filters.desde && Date.parse(filters.desde) && filters.hasta && Date.parse(filters.hasta)) {
        query.where("oferta.fechaPublicacion >= :desde", { desde: new Date(filters.desde) });
        query.andWhere("oferta.fechaCierre <= :hasta", { hasta: new Date(filters.hasta) });
    }

    // Ejecucion

    const result = await query.getMany() as any[];

    result.forEach(element => {
        cant += element.cant
    });

    return cant;
}

export const postulado = async (idOferta: number, idPostulante: number): Promise<Oferta | undefined> => {
    return await getRepository(Oferta)
        .createQueryBuilder("oferta")
        .leftJoin("oferta.postulantes", "postulantesOferta")
        .leftJoin("postulantesOferta.postulante", "postulante")
        .where("oferta.id = :idOferta", { idOferta })
        .andWhere("postulante.id = :idPostulante", { idPostulante })
        .getOne();
}