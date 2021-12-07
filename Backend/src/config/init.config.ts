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
import { NombreIdioma } from "../app/models/perfil/nombre-idioma.model";
import { NivelJerarquico } from "../app/models/perfil/nivel-jerarquico.model";
import { TipoPermiso } from "../app/models/perfil/tipo-permiso.model";
import { CategoriaConocimiento } from "../app/models/perfil/categoria-conocimiento.model";
import fs from "fs";
import { baseDir } from "../app/app.server";
import path from "path";
import { localidades } from "./data.config";

export const onInit = async () => {

    if (! await administradoresService.getByEmail("admin@admin.com")) {
        await administradoresService.post({
            email: "admin@admin.com",
            estado: EstadoUsuario.ACTIVO,
            contrasenia: await encryptPassword("admin")
        });
    }

    if (await paisesService.getCant() <= 0 && await departamentosService.getCant() <= 0 && await localidadesService.getCant() <= 0) {
        let paises = [{ nombre: "Afganistán" }, { nombre: "Albania" }, { nombre: "Alemania" }, { nombre: "Andorra" }, { nombre: "Angola" }, { nombre: "Antigua y Barbuda" }, { nombre: "Arabia Saudita" }, { nombre: "Argelia" }, { nombre: "Argentina" }, { nombre: "Armenia" }, { nombre: "Australia" }, { nombre: "Austria" }, { nombre: "Azerbaiyán" }, { nombre: "Bahamas" }, { nombre: "Bangladés" }, { nombre: "Barbados" }, { nombre: "Baréin" }, { nombre: "Bélgica" }, { nombre: "Belice" }, { nombre: "Benín" }, { nombre: "Bielorrusia" }, { nombre: "Birmania" }, { nombre: "Bolivia" }, { nombre: "Bosnia y Herzegovina" }, { nombre: "Botsuana" }, { nombre: "Brasil" }, { nombre: "Brunéi" }, { nombre: "Bulgaria" }, { nombre: "Burkina Faso" }, { nombre: "Burundi" }, { nombre: "Bután" }, { nombre: "Cabo Verde" }, { nombre: "Camboya" }, { nombre: "Camerún" }, { nombre: "Canadá" }, { nombre: "Catar" }, { nombre: "Chad" }, { nombre: "Chile" }, { nombre: "China" }, { nombre: "Chipre" }, { nombre: "Ciudad del Vaticano" }, { nombre: "Colombia" }, { nombre: "Comoras" }, { nombre: "Corea del Norte" }, { nombre: "Corea del Sur" }, { nombre: "Costa de Marfil" }, { nombre: "Costa Rica" }, { nombre: "Croacia" }, { nombre: "Cuba" }, { nombre: "Dinamarca" }, { nombre: "Dominica" }, { nombre: "Ecuador" }, { nombre: "Egipto" }, { nombre: "El Salvador" }, { nombre: "Emiratos Árabes Unidos" }, { nombre: "Eritrea" }, { nombre: "Eslovaquia" }, { nombre: "Eslovenia" }, { nombre: "España" }, { nombre: "Estados Unidos" }, { nombre: "Estonia" }, { nombre: "Etiopía" }, { nombre: "Filipinas" }, { nombre: "Finlandia" }, { nombre: "Fiyi" }, { nombre: "Francia" }, { nombre: "Gabón" }, { nombre: "Gambia" }, { nombre: "Georgia" }, { nombre: "Ghana" }, { nombre: "Granada" }, { nombre: "Grecia" }, { nombre: "Guatemala" }, { nombre: "Guyana" }, { nombre: "Guinea" }, { nombre: "Guinea ecuatorial" }, { nombre: "Guinea-Bisáu" }, { nombre: "Haití" }, { nombre: "Honduras" }, { nombre: "Hungría" }, { nombre: "India" }, { nombre: "Indonesia" }, { nombre: "Irak" }, { nombre: "Irán" }, { nombre: "Irlanda" }, { nombre: "Islandia" }, { nombre: "Islas Marshall" }, { nombre: "Islas Salomón" }, { nombre: "Israel" }, { nombre: "Italia" }, { nombre: "Jamaica" }, { nombre: "Japón" }, { nombre: "Jordania" }, { nombre: "Kazajistán" }, { nombre: "Kenia" }, { nombre: "Kirguistán" }, { nombre: "Kiribati" }, { nombre: "Kuwait" }, { nombre: "Laos" }, { nombre: "Lesoto" }, { nombre: "Letonia" }, { nombre: "Líbano" }, { nombre: "Liberia" }, { nombre: "Libia" }, { nombre: "Liechtenstein" }, { nombre: "Lituania" }, { nombre: "Luxemburgo" }, { nombre: "Madagascar" }, { nombre: "Malasia" }, { nombre: "Malaui" }, { nombre: "Maldivas" }, { nombre: "Malí" }, { nombre: "Malta" }, { nombre: "Marruecos" }, { nombre: "Mauricio" }, { nombre: "Mauritania" }, { nombre: "México" }, { nombre: "Micronesia" }, { nombre: "Moldavia" }, { nombre: "Mónaco" }, { nombre: "Mongolia" }, { nombre: "Montenegro" }, { nombre: "Mozambique" }, { nombre: "Namibia" }, { nombre: "Nauru" }, { nombre: "Nepal" }, { nombre: "Nicaragua" }, { nombre: "Níger" }, { nombre: "Nigeria" }, { nombre: "Noruega" }, { nombre: "Nueva Zelanda" }, { nombre: "Omán" }, { nombre: "Países Bajos" }, { nombre: "Pakistán" }, { nombre: "Palaos" }, { nombre: "Panamá" }, { nombre: "Papúa Nueva Guinea" }, { nombre: "Paraguay" }, { nombre: "Perú" }, { nombre: "Polonia" }, { nombre: "Portugal" }, { nombre: "Reino Unido" }, { nombre: "República Centroafricana" }, { nombre: "República Checa" }, { nombre: "República de Macedonia" }, { nombre: "República del Congo" }, { nombre: "República Democrática del Congo" }, { nombre: "República Dominicana" }, { nombre: "República Sudafricana" }, { nombre: "Ruanda" }, { nombre: "Rumanía" }, { nombre: "Rusia" }, { nombre: "Samoa" }, { nombre: "San Cristóbal y Nieves" }, { nombre: "San Marino" }, { nombre: "San Vicente y las Granadinas" }, { nombre: "Santa Lucía" }, { nombre: "Santo Tomé y Príncipe" }, { nombre: "Senegal" }, { nombre: "Serbia" }, { nombre: "Seychelles" }, { nombre: "Sierra Leona" }, { nombre: "Singapur" }, { nombre: "Siria" }, { nombre: "Somalia" }, { nombre: "Sri Lanka" }, { nombre: "Suazilandia" }, { nombre: "Sudán" }, { nombre: "Sudán del Sur" }, { nombre: "Suecia" }, { nombre: "Suiza" }, { nombre: "Surinam" }, { nombre: "Tailandia" }, { nombre: "Tanzania" }, { nombre: "Tayikistán" }, { nombre: "Timor Oriental" }, { nombre: "Togo" }, { nombre: "Tonga" }, { nombre: "Trinidad y Tobago" }, { nombre: "Túnez" }, { nombre: "Turkmenistán" }, { nombre: "Turquía" }, { nombre: "Tuvalu" }, { nombre: "Ucrania" }, { nombre: "Uganda" }, { nombre: "Uruguay" }, { nombre: "Uzbekistán" }, { nombre: "Vanuatu" }, { nombre: "Venezuela" }, { nombre: "Vietnam" }, { nombre: "Yemen" }, { nombre: "Yibuti" }, { nombre: "Zambia" }, { nombre: "Zimbabue" }];
        await paisesService.post(paises);

        const pais = await paisesService.getByNombre("Uruguay");
        let departamentos = [{ nombre: "Artigas", pais }, { nombre: "Canelones", pais }, { nombre: "Cerro Largo", pais }, { nombre: "Colonia", pais }, { nombre: "Durazno", pais }, { nombre: "Flores", pais }, { nombre: "Florida", pais }, { nombre: "Lavalleja", pais }, { nombre: "Maldonado", pais }, { nombre: "Montevideo", pais }, { nombre: "Paysandú", pais }, { nombre: "Río Negro", pais }, { nombre: "Rivera", pais }, { nombre: "Rocha", pais }, { nombre: "Salto", pais }, { nombre: "San José", pais }, { nombre: "Soriano", pais }, { nombre: "Tacuarembo", pais }, { nombre: "Treinta y Tres", pais }];
        await departamentosService.post(departamentos);

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

    if (await profileService.getCant(NombreIdioma.prototype) <= 0) {
        const nombresIdiomas = [{ nombre: "Alemán" }, { nombre: "Chino" }, { nombre: "Coreano" }, { nombre: "Español" }, { nombre: "Francés" }, { nombre: "Inglés" }, { nombre: "Japonés" }, { nombre: "Italiano" }, { nombre: "Portugués" }, { nombre: "Lenguaje de Señas" }, { nombre: "Otro" }];
        await profileService.post(NombreIdioma.prototype, nombresIdiomas);
    }

    if (await profileService.getCant(NivelJerarquico.prototype) <= 0) {
        const nivelesJerarquicos = [{ nombre: "Independiente" }, { nombre: "Empleado" }, { nombre: "Supervisor" }, { nombre: "Encargado" }, { nombre: "Gerente" }, { nombre: "Director" }, { nombre: "Otro" }];
        await profileService.post(NivelJerarquico.prototype, nivelesJerarquicos);
    }

    if (await profileService.getCant(TipoPermiso.prototype) <= 0) {
        const tiposPermisos = [{ nombre: "Carné de salud" }, { nombre: "Carné Cuida Coches" }, { nombre: "Carné de Aplicación de productos fitosanitarios" }, { nombre: "Carné de clasificador" }, { nombre: "Carné de Foguista" }, { nombre: "Carné de Manipulación de alimentos" }, { nombre: "Libreta de conducir Cat. A" }, { nombre: "Libreta de conducir Cat. B" }, { nombre: "Libreta de conducir Cat. C" }, { nombre: "Libreta de conducir Cat. D" }, { nombre: "Libreta de conducir Cat. E" }, { nombre: "Libreta de conducir Cat. F" }, { nombre: "Libreta de conducir Cat. G1" }, { nombre: "Libreta de conducir Cat. G2" }, { nombre: "Libreta de conducir Cat. G3" }, { nombre: "Libreta de conducir Cat. H" }, { nombre: "Porte de armas" }, { nombre: "Otro" }];
        await profileService.post(TipoPermiso.prototype, tiposPermisos);
    }

    if (await profileService.getCant(CategoriaConocimiento.prototype) <= 0) {
        const categoriasConocimientos = [{ nombre: "Ofimática" }, { nombre: "Base de datos" }, { nombre: "Comunicación" }, { nombre: "Diseño" }, { nombre: "Herramientas de Gestión" }, { nombre: "Herramientas de Contabilidad" }, { nombre: "Lenguaje de Programación" }, { nombre: "Paquetes integrados" }, { nombre: "Sistemas Operativos" }, { nombre: "Otro" }];
        await profileService.post(CategoriaConocimiento.prototype, categoriasConocimientos);
    }

    try {
        var relative = path.join(baseDir + "/../../uploads/");

        const novedadesPath = path.join(relative + "novedades");
        !fs.existsSync(novedadesPath) && fs.mkdirSync(novedadesPath, { recursive: true });

        const cvPath = path.join(relative + "perfil/documentos");
        !fs.existsSync(cvPath) && fs.mkdirSync(cvPath, { recursive: true });

        const imagenesPath = path.join(relative + "perfil/imagenes");
        !fs.existsSync(imagenesPath) && fs.mkdirSync(imagenesPath, { recursive: true });
    } catch (error) {

    }
}