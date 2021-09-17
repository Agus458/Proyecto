import { getRepository } from "typeorm";
import { encryptPassword } from "../app/libraries/encryptation.library";
import { EstadoUsuario } from "../app/models/enums";
import { Pais } from "../app/models/pais.model";
import * as administradoresService from "../app/services/administradores.service";
import * as paisesService from "../app/services/paises.service";

export const onInit = async () => {

    if (! await administradoresService.getByEmail("admin@admin.com")) {
        await administradoresService.post({
            email: "admin@admin.com",
            estado: EstadoUsuario.ACTIVO,
            contrasenia: await encryptPassword("admin")
        });
    }

    if (await paisesService.getCant() <= 0) {
        const paises = [{ nombre: "Uruguay" }, { nombre: "Brasil" }, { nombre: "Argentina" }];
        await paisesService.post(paises);
    }

}