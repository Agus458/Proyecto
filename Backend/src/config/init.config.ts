import { encryptPassword } from "../app/libraries/encryptation.library";
import { EstadoUsuario } from "../app/models/enums";
import * as administradoresService from "../app/services/administradores.service";

export const onInit = async () => {

    if (! await administradoresService.getByEmail("admin@admin.com")) {
        await administradoresService.post({
            email: "admin@admin.com",
            estado: EstadoUsuario.ACTIVO,
            contrasenia: await encryptPassword("admin")
        });
    }

}