import { getRepository } from "typeorm"
import { RestablecerContrasenia } from "../models/restablecerContrasenia.model"

export const post = async (token: string, email: string) => {
    const rest = getRepository(RestablecerContrasenia).create({ email, token });

    await getRepository(RestablecerContrasenia).save(rest);
}

export const getByToken = async (token: string) => {
    return await getRepository(RestablecerContrasenia).findOne({
        where: { token }
    });
}