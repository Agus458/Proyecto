import moment from "moment";
import { DeepPartial, getRepository } from "typeorm";
import { verifyPassword } from "../libraries/encryptation.library";
import { Domicilio } from "../models/domicilio.model";
import { Postulante } from "../models/postulante.model";

/* ---------------------------------------< POSTULANTES SERVICE >--------------------------------------- */

// Retorna todos los postulantes almacenados en el sistema.
export const get = async (): Promise<Postulante[]> => {
    return await getRepository(Postulante).find();
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
        relations: ["domicilio", "domicilio.pais", "domicilio.departamento", "domicilio.localidad", "capacitaciones", "capacitaciones.areaTematica", "capacitaciones.estadoCurso", "conocimientosInformaticos", "idiomas", "experienciasLaborales", "preferenciasLaborales", "permisos", "nivelEducativo", "estadoNivelEducativo"]
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

export const getFiltered = async (filters: any): Promise<{ postulantes: Postulante[], cantidad: number }> => {
    const query = getRepository(Postulante).createQueryBuilder("postulante");

    // Relaciones

    query.leftJoinAndSelect("postulante.domicilio", "domicilio")
    query.leftJoinAndSelect("domicilio.pais", "pais")
    query.leftJoinAndSelect("domicilio.departamento", "departamento")
    query.leftJoinAndSelect("domicilio.localidad", "localidad")
    query.leftJoinAndSelect("postulante.capacitaciones", "capacitacion")
    query.leftJoinAndSelect("postulante.conocimientosInformaticos", "conocimientoInformatico")
    query.leftJoinAndSelect("postulante.experienciasLaborales", "experienciaLaboral")
    query.leftJoinAndSelect("postulante.idiomas", "idioma")
    query.leftJoinAndSelect("postulante.permisos", "permiso")
    query.leftJoinAndSelect("postulante.preferenciasLaborales", "preferenciaLaboral");
    query.where("postulante.perfilPublico = true")

    // Filtros

    if (filters.sexo) query.andWhere("postulante.sexo = :sexo", { sexo: filters.sexo });
    if (filters.edad) query.andWhere("EXTRACT(DAY FROM ((NOW() - postulante.fechaNacimiento)/365)) = :edad", { edad: filters.edad });
    if (filters.departamento) query.andWhere("departamento.nombre = :departamento", { departamento: filters.departamento });
    if (filters.localidad) query.andWhere("localidad.nombre = :localidad", { localidad: filters.localidad });
    if (filters.areaTematica) query.andWhere("capacitacion.areaTematica = :areaTematica", { areaTematica: filters.areaTematica });
    if (filters.nivelEducativo) query.andWhere("postulante.nivelEducativo = :nivelEducativo", { nivelEducativo: filters.nivelEducativo });
    if (filters.estadoNivelEducativo) query.andWhere("postulante.estadoNivelEducativo = :estadoNivelEducativo", { estadoNivelEducativo: filters.estadoNivelEducativo });
    if (filters.idioma) query.andWhere("idioma.nombreIdioma = :idioma", { idioma: filters.idioma });
    if (filters.rubro) query.andWhere("experienciaLaboral.rubro = :rubro", { rubro: filters.rubro });
    if (filters.tipoDocumento) query.andWhere("permiso.tipoDocumento = :tipoDocumento", { tipoDocumento: filters.tipoDocumento });
    if (filters.areasInteres) query.andWhere("preferenciaLaboral.areasInteres = :areasInteres", { areasInteres: filters.areasInteres });

    // Paginado

    if (filters.skip) query.skip(filters.skip);
    if (filters.take) query.take(filters.take);

    // Ejecucion

    const result = await query.getManyAndCount();

    return { postulantes: result[0], cantidad: result[1] }
}