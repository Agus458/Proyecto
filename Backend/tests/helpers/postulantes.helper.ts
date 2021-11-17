import { getRepository } from "typeorm";
import { Capacitacion } from "../../src/app/models/capacitacion.model";
import { ConocimientoInformatico } from "../../src/app/models/conocimiento-informatico.model";
import { ExperienciaLaboral } from "../../src/app/models/experiencia-laboral.model";
import { Idioma } from "../../src/app/models/idioma.model";
import { Permiso } from "../../src/app/models/permiso.model";
import { Postulante } from "../../src/app/models/postulante.model";
import { PreferenciaLaboral } from "../../src/app/models/preferenciaLaboral.model";

export class PostulantesHelper {

    static tokenPostulante: string;

    static tokenAdmin: string;

    static tokenEmpresa: string;

    static last: number;

    static perfil = {
        tipoDocumento: 0,
        documento: "50072560",
        primerNombre: "Agustin",
        segundoNombre: "Nicolas",
        segundoApellido: "Schlueb",
        primerApellido: "Peraza",
        sexo: "Masculino",
        fechaNacimiento: "2000-09-04",
        nivelEducativo: 7,
        estadoNivelEducativo: 1,
        orientacion: "Cientifico",
        primerTelefono: "099727357",
        segundoTelefono: "1234654654",
        recivirEmails: true,
        aceptaTerminos: true,
        perfilPublico: false,
        domicilio: {
            pais: 1,
            departamento: 2,
            localidad: 2,
            direccion: "Rapetti"
        },
        jornadaCompleta: true,
        capacitaciones: [
            {
                nombreCurso: "BootCamp",
                institucion: "UTEC",
                areaTematica: 1,
                anioInicio: 2021,
                duracion: 10,
                tipoDuracion: "Semanas",
                estadoCurso: 1
            }
        ],
        conocimientosInformaticos: [
            {
                nombreAplicacion: "NodeJS",
                categoria: 1,
                nivelConocimiento: "Alto"
            }
        ],
        idiomas: [
            {
                nombreIdioma: 1,
                habla: "Fluido",
                comprensionAuditiva: "Fluido",
                comprensionLectora: "Fluido",
                escritura: "Fluido",
            }
        ],
        permisos: [
            {
                tipoDocumento: 1,
                vigencia: "2022-12-21",
                especificacion: "Descripcion"
            }
        ]
    }

    static perfilIncompleto = {
        tipoDocumento: 0,
        documento: "50072560",
        primerNombre: "Agustin",
        segundoNombre: "Nicolas"
    }

    static invalidPerfilRequests = [
        { primerNombre: 1243 },
        { fechaNacimiento: 1243 },
        { fechaNacimiento: "2022-09-04" },
        { primerApellido: 1243 },
        { nivelEducativo: 1243 },
        { nivelEducativo: {} },
        { estadoNivelEducativo: 1243 },
        { estadoNivelEducativo: [] },
        { domicilio: 1243 },
        {
            domicilio: {
                pais: "dsaj"
            }
        },
        {
            domicilio: {
                pais: "dsaj",
                direccion: "Rapetti"
            }
        },
        {
            domicilio: {
                pais: 1,
                departamento: "sadad",
                direccion: "Rapetti"
            }
        },
        {
            domicilio: {
                pais: 1,
                departamento: 2,
                localidad: "sad",
                direccion: "Rapetti"
            }
        },
        {
            domicilio: {
                pais: 90,
                departamento: 100,
                localidad: 213,
                direccion: "Rapetti"
            }
        },
        { capacitaciones: 1243 },
        { capacitaciones: [123] },
        {
            capacitaciones: [{
                nombreCurso: "BootCamp",
                institucion: "UTEC",
                areaTematica: "1",
                anioInicio: {},
                duracion: true,
                tipoDuracion: "Semanas",
                estadoCurso: 1
            }]
        },
        {
            capacitaciones: [{
                nombreCurso: "BootCamp",
                institucion: "UTEC",
                areaTematica: 1,
                anioInicio: 2021,
                duracion: true,
                tipoDuracion: "Semanas",
                estadoCurso: 1
            }]
        },
        {
            capacitaciones: {
                nombreCurso: "BootCamp",
                institucion: "UTEC",
                areaTematica: 1,
                anioInicio: 2021,
                duracion: 10,
                tipoDuracion: "Semanas",
                estadoCurso: 1
            }
        },
        {
            conocimientosInformaticos: {}
        },
        {
            conocimientosInformaticos: [{}]
        },
        {
            conocimientosInformaticos: [{ nombreAplicacion: "NodeJS" }]
        },
        {
            conocimientosInformaticos: [{ nombreAplicacion: 123 }]
        },
        {
            conocimientosInformaticos: [{
                nombreAplicacion: "NodeJS",
                categoria: 1123
            }]
        },
        {
            conocimientosInformaticos: [{
                nombreAplicacion: "NodeJS",
                categoria: "1123"
            }]
        },
        {
            conocimientosInformaticos: [{
                nombreAplicacion: "NodeJS",
                categoria: 1
            }]
        },
        {
            idiomas: {}
        },
        {
            idiomas: [{}]
        },
        {
            idiomas: [{
                nombreIdioma: 200,
            }]
        },
        {
            idiomas: [{
                nombreIdioma: "200",
            }]
        },
        {
            idiomas: [{
                nombreIdioma: 1,
                habla: 123,
            }]
        },
        {
            idiomas: [{
                nombreIdioma: 1,
                habla: "Fluido",
                comprensionAuditiva: 231,
            }]
        },
        {
            idiomas: [{
                nombreIdioma: 1,
                habla: "Fluido",
                comprensionAuditiva: "Fluido",
                comprensionLectora: {},
            }]
        },
        {
            idiomas: [{
                nombreIdioma: 1,
                habla: "Fluido",
                comprensionAuditiva: "Fluido",
                comprensionLectora: "Fluido",
                escritura: ["Fluido"],
            }]
        },
        {
            permisos: {}
        },
        {
            permisos: [{}]
        },
        {
            permisos: [{ tipoDocumento: "1" }]
        },
        {
            permisos: [{ tipoDocumento: 1123 }]
        },
        {
            permisos: [
                {
                    tipoDocumento: 1,
                    vigencia: 213
                }
            ]
        },
        {
            permisos: [
                {
                    tipoDocumento: 1,
                    vigencia: "dsadsa",
                    especificacion: "Descripcion"
                }
            ]
        },
        {
            permisos: [
                {
                    tipoDocumento: 1,
                    vigencia: "2022-12-21",
                    especificacion: 321321
                }
            ]
        }
    ]

    static async clear() {
        await getRepository(Capacitacion).delete({});
        await getRepository(ConocimientoInformatico).delete({});
        await getRepository(Idioma).delete({});
        await getRepository(Permiso).delete({});
        await getRepository(PreferenciaLaboral).delete({});
        await getRepository(ExperienciaLaboral).delete({});
        await getRepository(Postulante).delete({});
    }
}