import { getConnection } from "typeorm";

export const getEmpresa = async (rut: string) => {
    try {
        return await getConnection("appsocios")
            .createQueryBuilder()
            .select()
            .from("empresa", "empresa")
            .where("empresa.rut = :rut", { rut })
            .getRawOne();
    } catch (error) {

    }
}

export const getLocalidad = async (id: number) => {
    try {
        return await getConnection("appsocios")
            .createQueryBuilder()
            .select()
            .from("localidad", "localidad")
            .where("localidad.id = :id", { id })
            .getRawOne();
    } catch (error) {

    }
}