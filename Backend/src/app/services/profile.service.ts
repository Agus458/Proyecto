import { DeepPartial, getRepository } from "typeorm";

/* ---------------------------------------< PROFILE SERVICE >--------------------------------------- */

export const get = async (type: Object): Promise<any[]> => {
    return await getRepository(type.constructor).find();
};

export const getById = async (type: Object, id: number): Promise<any> => {
    return await getRepository(type.constructor).findOne(id);
};

export const getCant = async (type: Object): Promise<number> => {
    return await getRepository(type.constructor).count();
}

export const post = async (type: Object, data: DeepPartial<any>[]): Promise<any[]> => {
    const nuevoDepartamento = getRepository(type.constructor).create(data);

    return await getRepository(type.constructor).save(nuevoDepartamento);
};

export const put = async (type: Object, id: number, data: DeepPartial<any>): Promise<void> => {
    data.id = id;
    await getRepository(type.constructor).save(data);
};