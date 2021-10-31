import moment from "moment";
import { Between, DeepPartial, getRepository, LessThan, MoreThan } from "typeorm";
import { Empresa } from "../models/empresa.model";
import { Oferta } from "../models/oferta.model";
import { Postulante } from "../models/postulante.model";
import { Pagination } from "../models/pagination.mode";
import { PostulanteOferta } from "../models/postulante-oferta.model";

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

export const getPostulantesOferta = async (id: number, filters: any): Promise<Pagination<Postulante>> => {
    const query = getRepository(Postulante).createQueryBuilder("postulante");

    // Relaciones
    query.leftJoin("postulante.domicilio", "domicilio");
    query.leftJoin("domicilio.pais", "pais");
    query.leftJoin("domicilio.departamento", "departamento");
    query.leftJoin("domicilio.localidad", "localidad");

    query.leftJoin("postulante.nivelEducativo", "nivelEducativo");
    query.leftJoin("postulante.estadoNivelEducativo", "estadoNivelEducativo");

    query.leftJoin("postulante.capacitaciones", "capacitacion");
    query.leftJoin("capacitacion.areaTematica", "areaTematica");

    query.leftJoin("postulante.experienciasLaborales", "experienciaLaboral");
    query.leftJoin("experienciaLaboral.rubro", "rubro");

    query.leftJoin("postulante.idiomas", "idioma");
    query.leftJoin("idioma.nombreIdioma", "nombreIdioma");

    query.leftJoin("postulante.permisos", "permiso");
    query.leftJoin("permiso.tipoDocumento", "tipoDocumento");

    query.leftJoin("postulante.preferenciasLaborales", "preferenciaLaboral");
    query.leftJoin("preferenciaLaboral.areasInteres", "areasInteres");

    query.leftJoin("postulante.ofertas", "postulantesOferta");
    query.leftJoin("postulantesOferta.oferta", "oferta");

    query.where("oferta.id = :id", { id });

    // Filtros

    if (filters.sexo) query.andWhere("postulante.sexo = :sexo", { sexo: filters.sexo });
    if (filters.edadmin && filters.edadmax) {
        query.andWhere("EXTRACT(DAY FROM ((NOW() - postulante.fechaNacimiento)/365)) >= :edadmin", { edadmin: filters.edadmin });
        query.andWhere("EXTRACT(DAY FROM ((NOW() - postulante.fechaNacimiento)/365)) <= :edadmax", { edadmax: filters.edadmax });
    }
    if (filters.departamento) query.andWhere("departamento.id = :departamento", { departamento: filters.departamento });
    if (filters.localidad) query.andWhere("localidad.id = :localidad", { localidad: filters.localidad });
    if (filters.areaTematica) query.andWhere("areaTematica.id = :areaTematica", { areaTematica: filters.areaTematica });
    if (filters.nivelEducativo) query.andWhere("nivelEducativo.id = :nivelEducativo", { nivelEducativo: filters.nivelEducativo });
    if (filters.estadoNivelEducativo) query.andWhere("estadoNivelEducativo.id = :estadoNivelEducativo", { estadoNivelEducativo: filters.estadoNivelEducativo });
    if (filters.idioma) query.andWhere("nombreIdioma.id = :idioma", { idioma: filters.idioma });
    if (filters.rubro) query.andWhere("rubro.id = :rubro", { rubro: filters.rubro });
    if (filters.tipoDocumento) query.andWhere("tipoDocumento.id = :tipoDocumento", { tipoDocumento: filters.tipoDocumento });
    if (filters.areasInteres) query.andWhere("areasInteres.id = :areasInteres", { areasInteres: filters.areasInteres });

    // Paginado

    if (filters.skip) query.skip(filters.skip);
    if (filters.take) query.take(filters.take);

    // Ejecucion

    const result = await query.getManyAndCount();

    return { data: result[0], cantidad: result[1] }
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

export const getOfertasFiltered = async (filters: any): Promise<number> => {
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

    return await query.getCount();
}

export const getCantPostulantesOfertas = async (filters: any): Promise<number> => {
    const query = getRepository(PostulanteOferta).createQueryBuilder("postulanteOferta");

    // Filtros

    if (filters.desde && Date.parse(filters.desde) && filters.hasta && Date.parse(filters.hasta)) {
        query.where("postulanteOferta.createdDate >= :desde", { desde: new Date(filters.desde) });
        query.andWhere("postulanteOferta.createdDate <= :hasta", { hasta: new Date(filters.hasta) });
    }

    // Ejecucion

    return await query.getCount();
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

export const postuladoAEmpresa = async (idEmpresa: number, idPostulante: number): Promise<Oferta | undefined> => {
    return await getRepository(Oferta)
        .createQueryBuilder("oferta")
        .leftJoin("oferta.postulantes", "postulantesOferta")
        .leftJoin("postulantesOferta.postulante", "postulante")
        .leftJoin("oferta.empresa", "empresa")
        .where("empresa.id = :idEmpresa", { idEmpresa })
        .andWhere("postulante.id = :idPostulante", { idPostulante })
        .getOne();
}

export const getOfertasByMonth = async (months: Date[]) => {
    const result: { month: Date, cant: number }[] = [];
    for (let index = 0; index < months.length; index++) {
        const month = months[index];

        result.push({
            month,
            cant: await getRepository(Oferta).count({
                where: {
                    fechaPublicacion: Between(moment(month).utc(true).startOf("month").toDate(), month)
                }
            })
        });
    }

    return result;
}

export const getPostulacionesByMonth = async (months: Date[]) => {
    const result: { month: Date, cant: number }[] = [];
    for (let index = 0; index < months.length; index++) {
        const month = months[index];

        result.push({
            month,
            cant: await getRepository(PostulanteOferta).count({
                where: {
                    createdDate: Between(moment(month).utc(true).startOf("month").toDate(), month)
                }
            })
        })
    }

    return result;
}