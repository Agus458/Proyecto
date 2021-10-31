import moment from "moment";
import { Between, DeepPartial, getRepository } from "typeorm";
import { verifyPassword } from "../libraries/encryptation.library";
import { Empresa } from "../models/empresa.model";
import { EstadoUsuario } from "../models/enums";
import { Pagination } from "../models/pagination.mode";

/* ---------------------------------------< EMPRESAS SERVICE >--------------------------------------- */

// Retorna todas las empresas almacenadas en el sistema.
export const getAll = async (filters: any): Promise<Pagination<Empresa>> => {
    const query = getRepository(Empresa).createQueryBuilder("empresa");

    if (filters.estado && EstadoUsuario[filters.estado]) query.andWhere("empresa.estado = :estado", { estado: filters.estado });

    // Paginado

    if (filters.skip) query.skip(filters.skip);
    if (filters.take) query.take(filters.take);

    // Ejecucion

    const result = await query.getManyAndCount();

    return { data: result[0], cantidad: result[1] }
};

// Retorna la empresa almacenado en el sistema cuyo id sea el ingresado.
export const getById = async (id: number): Promise<Empresa | undefined> => {
    return await getRepository(Empresa).findOne(id);
};

// Retorna la Empresa almacenada en el sistema cuyo email sea el ingresado.
export const getByEmail = async (email: string): Promise<Empresa | undefined> => {
    return await getRepository(Empresa).findOne({
        where: { email }
    });
};

// Retorna la Empresa almacenada en el sistema cuyo rut sea el ingresado.
export const getByRut = async (rut: string): Promise<Empresa | undefined> => {
    return await getRepository(Empresa).findOne({
        where: { rut },
        select: ["rut", "id", "contrasenia", "email", "nombreFantasia", "telefono", "visibilidad", "razonSocial", "socia", "estado"],
        relations: ["localidad", "localidad.departamento"]
    });
};

export const getContraseniaByEmail = async (email: string): Promise<Empresa | undefined> => {
    return await getRepository(Empresa).findOne({
        select: ["id", "email", "contrasenia"],
        where: { email }
    });
};

// Retorna la Empresa almacenada en el sistema cuyo email y contrasenia sea el ingresado.
export const getByEmailContrasenia = async (email: string, contrasenia: string): Promise<Empresa | undefined> => {
    const usuario = await getRepository(Empresa).findOne({
        select: ["id", "email", "contrasenia", "estado", "vencimiento"],
        where: { email }
    });

    if (usuario && await verifyPassword(contrasenia, usuario.contrasenia)) return usuario;

    return undefined;
};

// Almacena en el sistema una nueva empresa.
export const post = async (data: DeepPartial<Empresa>): Promise<Empresa> => {
    const nuevaEmpresa = getRepository(Empresa).create(data);

    return await getRepository(Empresa).save(nuevaEmpresa);
};

// Actualiza en el sistema una empresa.
export const put = async (id: number, data: DeepPartial<Empresa>): Promise<Empresa> => {
    data.id = id;
    return await getRepository(Empresa).save(data);
};

export const getEmpresasFiltered = async (filters: any): Promise<number> => {
    const query = getRepository(Empresa).createQueryBuilder("empresa");

    // Filtros

    if (filters.desde && Date.parse(filters.desde) && filters.hasta && Date.parse(filters.hasta)) {
        query.where("empresa.createdDate >= :desde", { desde: new Date(filters.desde) });
        query.andWhere("empresa.createdDate <= :hasta", { hasta: new Date(filters.hasta) });
    }

    // Ejecucion

    return await query.getCount();
}

export const getEmpresasByMonth = async (months: Date[]) => {
    const result: { month: Date, cant: number }[] = [];
    for (let index = 0; index < months.length; index++) {
        const month = months[index];

        result.push({
            month,
            cant: await getRepository(Empresa).count({
                where: {
                    createdDate: Between(moment(month).utc(true).startOf("month").toDate(), month)
                }
            })
        })
    }

    return result;
}