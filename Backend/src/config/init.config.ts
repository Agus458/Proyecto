import { getRepository } from "typeorm";
import { encryptPassword } from "../app/libraries/encryptation.library";
import { EstadoUsuario } from "../app/models/enums";
import { Pais } from "../app/models/pais.model";
import * as administradoresService from "../app/services/administradores.service";
import * as paisesService from "../app/services/paises.service";
import * as departamentosService from "../app/services/departamentos.service";
import * as localidadesService from "../app/services/localidades.service";

export const onInit = async () => {

    if (! await administradoresService.getByEmail("admin@admin.com")) {
        await administradoresService.post({
            email: "admin@admin.com",
            estado: EstadoUsuario.ACTIVO,
            contrasenia: await encryptPassword("admin")
        });
    }

    if (await paisesService.getCant() <= 0 && await departamentosService.getCant() <= 0 && await localidadesService.getCant() <= 0) {
        const paises = [{ nombre: "Uruguay" }, { nombre: "Brasil" }, { nombre: "Argentina" }];
        await paisesService.post(paises);

        const pais = await paisesService.getByNombre("Uruguay");
        const departamentos = [{ nombre: "San Jose", pais }, { nombre: "Colonia", pais }, { nombre: "Montevideo", pais }];
        await departamentosService.post(departamentos);

        const localidades = [{ nombre: "San Jose De Mayo", departamento: { id: 1 } }, { nombre: "Nueva Helvecia", departamento: { id: 2 } }, { nombre: "Montevideo", departamento: { id: 3 } }];
        await localidadesService.post(localidades);
    }

}