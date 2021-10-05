import { getRepository } from "typeorm"
import { SolicitudEmpresa } from "../models/solicitudEmpresa.model"

export const post = async (token: string, rut: string) => {
    const rest = getRepository(SolicitudEmpresa).create({ rut, token });

    await getRepository(SolicitudEmpresa).createQueryBuilder()
        .insert()
        .values(rest)
        .onConflict('("rut") DO UPDATE SET "token" = :token')
        .setParameter("token", token)
        .execute()
    ;
}

export const getByToken = async (token: string) => {
    return await getRepository(SolicitudEmpresa).findOne({
        where: { token }
    });
}