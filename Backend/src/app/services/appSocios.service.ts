import { getConnection } from "typeorm";

export const getEmpresa = async (rut: string) => {
    return await getConnection("appsocios")
        .createQueryBuilder()
        .select()
        .from("empresa", "empresa")
        .where("empresa.rut = :rut", { rut })
        .getRawOne();
}

export const getLocalidad = async (id: number) => {
    return await getConnection("appsocios")
        .createQueryBuilder()
        .select()
        .from("localidad", "localidad")
        .where("localidad.id = :id", { id })
        .getRawOne();
}