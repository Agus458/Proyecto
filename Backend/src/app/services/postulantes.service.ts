import moment from "moment";
import { Between, DeepPartial, getRepository } from "typeorm";
import { verifyPassword } from "../libraries/encryptation.library";
import { EstadoUsuario } from "../models/enums";
import { Pagination } from "../models/pagination.mode";
import { Postulante } from "../models/postulante.model";

/* ---------------------------------------< POSTULANTES SERVICE >--------------------------------------- */

// Retorna todos los postulantes almacenados en el sistema.
export const get = async (): Promise<Postulante[]> => {
    return await getRepository(Postulante).find();
};

export const getSubscribed = async (): Promise<Postulante[]> => {
    return await getRepository(Postulante).find({
        select: ["email"],
        where: {
            estado: EstadoUsuario.ACTIVO,
            recivirEmails: true
        }
    });
};

// Retorna el postulante almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Postulante | undefined> => {
    return await getRepository(Postulante).findOne(id);
};

// Retorna el postulante almacenado en el sistema cuyo email sea el ingresado.
export const getByEmail = async (email: string): Promise<Postulante | undefined> => {
    return await getRepository(Postulante).findOne({
        where: { email }
    });
};

// Retorna el postulante almacenado en el sistema cuyo email sea el ingresado.
export const getByDocumento = async (documento: string): Promise<Postulante | undefined> => {
    return await getRepository(Postulante).findOne({
        where: { documento }
    });
};

export const getContraseniaByEmail = async (email: string): Promise<Postulante | undefined> => {
    return await getRepository(Postulante).findOne({
        select: ["id", "email", "contrasenia"],
        where: { email }
    });
};

// Retorna el postulante almacenado en el sistema cuyo email y contrasenia sea el ingresado.
export const getByEmailContrasenia = async (email: string, contrasenia: string): Promise<Postulante | undefined> => {
    const usuario = await getRepository(Postulante).findOne({
        select: ["id", "email", "contrasenia", "estado"],
        where: { email }
    });

    if (usuario && await verifyPassword(contrasenia, usuario.contrasenia)) return usuario;

    return undefined;
};

// Retorna el perfil completo del postulante almacenado en el sistema cuyo id sea el ingresado.
export const getPerfilById = async (id: number): Promise<Postulante | undefined> => {
    const postulante: any = await getRepository(Postulante).findOne(id, {
        where: { estado: EstadoUsuario.ACTIVO },
        relations: ["domicilio", "domicilio.pais", "domicilio.departamento", "domicilio.localidad", "capacitaciones", "capacitaciones.areaTematica", "capacitaciones.estadoCurso", "conocimientosInformaticos", "conocimientosInformaticos.categoria", "idiomas", "idiomas.nombreIdioma", "experienciasLaborales", "experienciasLaborales.nivelJerarquico", "experienciasLaborales.rubro", "preferenciasLaborales", "preferenciasLaborales.areasInteres", "permisos", "permisos.tipoDocumento", "nivelEducativo", "estadoNivelEducativo"]
    });

    return postulante;
};

// Almacena en el sistema un nuevo postulante.
export const post = async (data: DeepPartial<Postulante>): Promise<Postulante> => {
    const nuevoPostulante = getRepository(Postulante).create(data);

    return await getRepository(Postulante).save(nuevoPostulante);
};

// Almacena en el sistema un nuevo postulante.
export const put = async (id: number, data: DeepPartial<Postulante>): Promise<void> => {
    data.id = id;
    await getRepository(Postulante).save(data);
};

export const getFiltered = async (filters: any): Promise<Pagination<Postulante>> => {
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

    query.where("postulante.perfilPublico = true");

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

export const getPostulanteFiltered = async (filters: any): Promise<number> => {
    const query = getRepository(Postulante).createQueryBuilder("postulante");

    // Filtros

    if (filters.desde && Date.parse(filters.desde) && filters.hasta && Date.parse(filters.hasta)) {
        query.where("postulante.createdDate >= :desde", { desde: new Date(filters.desde) });
        query.andWhere("postulante.createdDate <= :hasta", { hasta: new Date(filters.hasta) });
    }

    // Ejecucion

    return await query.getCount();
}

export const getPostulantesByMonth = async (months: Date[]) => {
    const result: { month: Date, cant: number }[] = [];
    for (let index = 0; index < months.length; index++) {
        const month = months[index];

        result.push({
            month,
            cant: await getRepository(Postulante).count({
                where: {
                    createdDate: Between(moment(month).utc(true).startOf("month").toDate(), month)
                }
            })
        })
    }

    return result;
}