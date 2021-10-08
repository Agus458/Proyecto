import { getRepository } from "typeorm";
import { encryptPassword } from "../app/libraries/encryptation.library";
import { EstadoUsuario } from "../app/models/enums";
import { Pais } from "../app/models/pais.model";
import * as administradoresService from "../app/services/administradores.service";
import * as paisesService from "../app/services/paises.service";
import * as departamentosService from "../app/services/departamentos.service";
import * as localidadesService from "../app/services/localidades.service";
import * as profileService from "../app/services/profile.service";
import { NivelEducativo } from "../app/models/perfil/nivel-educativo";
import { Estado } from "../app/models/perfil/estado";
import { AreaTematica } from "../app/models/perfil/area-tematica";

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

    if (await profileService.getCant(NivelEducativo.prototype) <= 0) {
        const nivelesEducativos = [{ nombre: "Primaria" }, { nombre: "Ciclo Básico Liceo" }, { nombre: "Bachillerato Liceo" }, { nombre: "Técnico Profesional UTU" }, { nombre: "Magisterio - Profesorado" }, { nombre: "Terciario no universitario" }, { nombre: "Universitario" }, { nombre: "Posgrado - Master - Doctorado" }];
        await profileService.post(NivelEducativo.prototype, nivelesEducativos);
    }

    if (await profileService.getCant(Estado.prototype) <= 0) {
        const nivelesEducativos = [{ nombre: "Completo" }, { nombre: "Incompleto" }, { nombre: "Cursando" }];
        await profileService.post(Estado.prototype, nivelesEducativos);
    }

    if (await profileService.getCant(AreaTematica.prototype) <= 0) {
        const areasTematicas = [{ nombre: "Administración - Secretariado" }, { nombre: "Arte - Cultura" }, { nombre: "Atención al Cliente" }, { nombre: "Automotriz - Mecánica" }, { nombre: "Banca - Servicios Financieros" }, { nombre: "Comercio - Maercado - Ventas" }, { nombre: "Comunicación" }, { nombre: "Oficios - Construcción - Servicios Varios" }, { nombre: "Contabilidad - Auditoría - Finanzas" }, { nombre: "Diseño - Marketing - Publicidad" }, { nombre: "Estética" }, { nombre: "Gastronomía" }, { nombre: "Idiomas" }, { nombre: "Informática" }, { nombre: "Recursos Humanos" }, { nombre: "Salud" }, { nombre: "Seguridad / Vigilancia" }, { nombre: "Tecnologías de la Información" }, { nombre: "Turismo - Hotelería" }, { nombre: "Otro" }];
        await profileService.post(AreaTematica.prototype, areasTematicas);
    }

}