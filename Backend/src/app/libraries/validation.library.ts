import validator from "validator";
import moment from "moment";

import { AppError } from "../../config/error/appError";
import { TipoDocumento } from "../models/enums"
import { Postulante } from "../models/postulante.model";
import * as paisesService from "../services/paises.service";
import * as departamentosService from "../services/departamentos.service";
import * as localidadesService from "../services/localidades.service";
import * as capacitacionesService from "../services/capacitaciones.service";
import * as conocimientosService from "../services/conocimientos.service";
import * as idiomasService from "../services/idiomas.service";
import * as experienciasLaboralesService from "../services/experienciasLaborales.service";

// Valida que los datos personales del postulante sean correctos.
export const validarDatosPersonales = (data: any) => {
    if (data.tipoDocumento || data.documento) {
        if (typeof data.tipoDocumento == "undefined") throw AppError.badRequestError("Falta el tipo del documento del postulante");
        if (typeof data.tipoDocumento != "number" || !TipoDocumento[data.tipoDocumento]) throw AppError.badRequestError("Tipo de documento invalido");
        if (!data.documento) throw AppError.badRequestError("Falta el documento del postulante");

        if (data.tipoDocumento.valueOf() == TipoDocumento.CI.valueOf() && (!validator.isInt(data.documento) || !validator.isLength(data.documento, { max: 8, min: 8 }))) throw AppError.badRequestError("Cedula invalida");
    }

    if (data.sexo) {
        if (typeof data.sexo != "string") throw AppError.badRequestError("Sexo invalido");
    }

    if (data.primerNombre && typeof data.primerNombre != "string") throw AppError.badRequestError("Primer Nombre invalido");
    if (data.segundoNombre && typeof data.segundoNombre != "string") throw AppError.badRequestError("Segundo Nombre invalido");
    if (data.primerApellido && typeof data.primerApellido != "string") throw AppError.badRequestError("Primer Apellido invalido");
    if (data.segundoApellido && typeof data.segundoApellido != "string") throw AppError.badRequestError("Segundo Apellido invalido");

    if (data.fechaNacimiento) {
        if (typeof data.fechaNacimiento != "string" || !Date.parse(data.fechaNacimiento)) throw AppError.badRequestError("Fecha de nacimiento invalida. Formato Valido: YYYY-MM-DD");
        const fechaNacimiento = moment(data.fechaNacimiento, "YYYY-MM-DD");
        if (fechaNacimiento.isAfter(moment())) throw AppError.badRequestError("Fecha de nacimiento debe ser anterior a la fecha actual");
        data.fechaNacimiento = fechaNacimiento.toDate();
    }

    if (data.primerTelefono && typeof data.primerTelefono != "string") throw AppError.badRequestError("Primer Telefono invalido");
    if (data.segundoTelefono && typeof data.segundoTelefono != "string") throw AppError.badRequestError("Segundo Telefono invalido");

    if (data.recivirEmails && typeof data.recivirEmails != "boolean") throw AppError.badRequestError("Recivir Emails invalido");

    if (data.nivelEducativo && typeof data.nivelEducativo != "string") throw AppError.badRequestError("Nivel Educativo invalido");
    if (data.estadoNivelEducativo && typeof data.estadoNivelEducativo != "string") throw AppError.badRequestError("Estado Nivel Educativo invalido");
    if (data.orientacion && typeof data.orientacion != "string") throw AppError.badRequestError("Orientacion invalida");
}

// Valida que el domicilio sea correctos.
export const validarDomicilio = async (domicilio: any, domicilioPostulante: any) => {
    if (domicilio) {
        if (!(domicilio instanceof Object)) throw AppError.badRequestError("Domicilio invalido");
        if (domicilioPostulante) domicilio.id = domicilioPostulante.id;

        if (!domicilio.direccion) throw AppError.badRequestError("No se ingreso la direccion de domicilio");
        if (typeof domicilio.direccion != "string") throw AppError.badRequestError("Direccion de domicilio invalida");

        if (domicilio.barrio) {
            if (typeof domicilio.barrio != "string") throw AppError.badRequestError("Barrio de domicilio invalido");
        }

        if (!domicilio.pais) throw AppError.badRequestError("No se ingreso el pais de domicilio");
        if (typeof domicilio.pais != "number") throw AppError.badRequestError("Pais invalido");

        const pais = await paisesService.getById(domicilio.pais);
        if (!pais) throw AppError.badRequestError("No existe el pais ingresado");

        if (pais.nombre == "Uruguay") {
            if (!domicilio.departamento) throw AppError.badRequestError("No se ingreso el departamento de domicilio");
            if (!domicilio.localidad) throw AppError.badRequestError("No se ingreso la localidad de domicilio");
            if (typeof domicilio.departamento != "number") throw AppError.badRequestError("Departamento invalido");
            if (typeof domicilio.localidad != "number") throw AppError.badRequestError("Localidad invalida");

            const departamento = await departamentosService.getById(domicilio.departamento);
            if (!departamento) throw AppError.badRequestError("No existe el departamento ingresado");

            if (departamento.pais.id != pais.id) throw AppError.badRequestError("El departamento no pertence a pais ingresado");

            const localidad = await localidadesService.getById(domicilio.localidad);
            if (!localidad) throw AppError.badRequestError("No existe la localidad ingresado");

            if (localidad.departamento.id != departamento.id) throw AppError.badRequestError("La localidad no pertence al departamento ingresado");
        } else {
            domicilio.departamento = undefined;
            domicilio.localidad = undefined;
        }
    } else {
        domicilio = domicilioPostulante;
    }

    return domicilio;
}

export const validarCapacitaciones = async (capacitaciones: any, postulante: Postulante) => {
    if (capacitaciones.constructor != Array) throw AppError.badRequestError("Capacitaciones invalidas");

    for (let index = 0; index < capacitaciones.length; index++) {
        const capacitacion = capacitaciones[index];
        if (typeof capacitacion != "object") throw AppError.badRequestError("Capacitacion invalida");

        if (capacitacion.id) {
            if (typeof capacitacion.id != "number") throw AppError.badRequestError("Id de Capacitacion invalido");
            const capacitacionGuardada = await capacitacionesService.getById(capacitacion.id);
            if (!capacitacionGuardada) throw AppError.badRequestError("No existe una capacitacion con el id: " + capacitacion.id);
            if (capacitacionGuardada.postulante.id != postulante.id) throw AppError.badRequestError("La capacitacion con el id: " + capacitacion.id + " no pretenece al usuario");
        }
        if (!capacitacion.nombreCurso || typeof capacitacion.nombreCurso != "string") throw AppError.badRequestError("Nombre de Curso de Capacitacion invalido o no ingresado");
        if (!capacitacion.institucion || typeof capacitacion.institucion != "string") throw AppError.badRequestError("Institucion de Capacitacion invalido o no ingresado");
        if (!capacitacion.areaTematica || typeof capacitacion.areaTematica != "string") throw AppError.badRequestError("Area Tematica de Capacitacion invalido o no ingresado");
        if (!capacitacion.anioInicio || typeof capacitacion.anioInicio != "string") throw AppError.badRequestError("Año de Inicio de Capacitacion invalido o no ingresado");
        if (!capacitacion.duracion || typeof capacitacion.duracion != "string") throw AppError.badRequestError("Duracion de Capacitacion invalido o no ingresado");
        if (!capacitacion.tipoDuracion || typeof capacitacion.tipoDuracion != "string") throw AppError.badRequestError("Tipo de Duracion de Capacitacion invalido o no ingresado");
        if (!capacitacion.estadoCurso || typeof capacitacion.estadoCurso != "string") throw AppError.badRequestError("Estado de Curso de Capacitacion invalido o no ingresado");

        capacitacion.postulante = postulante;
    }

    return capacitaciones;
}

export const validarConocimientoInformatico = async (conocimientos: any, postulante: Postulante) => {
    if (conocimientos.constructor != Array) throw AppError.badRequestError("Conocimientos Informaticos invalidas");

    for (let index = 0; index < conocimientos.length; index++) {
        const conocimiento = conocimientos[index];
        if (typeof conocimiento != "object") throw AppError.badRequestError("Conocimiento Informatico invalido");

        if (conocimiento.id) {
            if (typeof conocimiento.id != "number") throw AppError.badRequestError("Id de Conocimiento Informatico invalido");
            const conocimientoGuardado = await conocimientosService.getById(conocimiento.id);
            if (!conocimientoGuardado) throw AppError.badRequestError("No existe un Conocimiento Informatico con el id: " + conocimiento.id);
            if (conocimientoGuardado.postulante.id != postulante.id) throw AppError.badRequestError("El Conocimiento Informatico con el id: " + conocimiento.id + " no pretenece al usuario");
        }
        if (!conocimiento.nombreAplicacion || typeof conocimiento.nombreAplicacion != "string") throw AppError.badRequestError("Nombre de Aplicacion de Conocimiento Informatico invalido o no ingresado");
        if (!conocimiento.categoria || typeof conocimiento.categoria != "string") throw AppError.badRequestError("Categoria de Conocimiento Informatico invalido o no ingresado");
        if (!conocimiento.nivelConocimiento || typeof conocimiento.nivelConocimiento != "string") throw AppError.badRequestError("Nivel de Conocimiento Informatico invalido o no ingresado");

        conocimiento.postulante = postulante;
    }

    return conocimientos;
}

export const validarIdiomas = async (idiomas: any, postulante: Postulante) => {
    if (idiomas.constructor != Array) throw AppError.badRequestError("Idiomas invalidos");

    for (let index = 0; index < idiomas.length; index++) {
        const idioma = idiomas[index];
        if (typeof idioma != "object") throw AppError.badRequestError("Idioma invalido");

        if (idioma.id) {
            if (typeof idioma.id != "number") throw AppError.badRequestError("Id de Idioma invalido");
            const idiomaGuardado = await idiomasService.getById(idioma.id);
            if (!idiomaGuardado) throw AppError.badRequestError("No existe un Idioma con el id: " + idioma.id);
            if (idiomaGuardado.postulante.id != postulante.id) throw AppError.badRequestError("El Idioma con el id: " + idioma.id + " no pretenece al usuario");
        }
        if (!idioma.nombreIdioma || typeof idioma.nombreIdioma != "string") throw AppError.badRequestError("Nombre de Idioma invalido o no ingresado");
        if (idioma.especificacion && typeof idioma.especificacion != "string") throw AppError.badRequestError("Especificacion de Idioma invalida o no ingresada");
        if (!idioma.habla || typeof idioma.habla != "string") throw AppError.badRequestError("Habla de Idioma invalido o no ingresado");
        if (!idioma.comprensionAuditiva || typeof idioma.comprensionAuditiva != "string") throw AppError.badRequestError("Comprension Auditiva de Idioma invalido o no ingresado");
        if (!idioma.comprensionLectora || typeof idioma.comprensionLectora != "string") throw AppError.badRequestError("Comprension Lectora de Idioma invalido o no ingresado");
        if (!idioma.escritura || typeof idioma.escritura != "string") throw AppError.badRequestError("Escritura de Idioma invalido o no ingresado");

        idioma.postulante = postulante;
    }

    return idiomas;
}

export const validarExperienciasLaborales = async (experienciasLaborales: any, postulante: Postulante) => {
    if (experienciasLaborales.constructor != Array) throw AppError.badRequestError("Experiencias Laborales invalidos");

    for (let index = 0; index < experienciasLaborales.length; index++) {
        const experienciaLaboral = experienciasLaborales[index];
        if (typeof experienciaLaboral != "object") throw AppError.badRequestError("Experiencia Laboral invalida");

        if (experienciaLaboral.id) {
            if (typeof experienciaLaboral.id != "number") throw AppError.badRequestError("Id de Experiencia Laboral");
            const experienciaLaboralGuardada = await experienciasLaboralesService.getById(experienciaLaboral.id);
            if (!experienciaLaboralGuardada) throw AppError.badRequestError("No existe una Experiencia Laboral con el id: " + experienciaLaboral.id);
            if (experienciaLaboralGuardada.postulante.id != postulante.id) throw AppError.badRequestError("La Experiencia Laboral con el id: " + experienciaLaboral.id + " no pretenece al usuario");
        }
        if (!experienciaLaboral.nombreEmpresa || typeof experienciaLaboral.nombreEmpresa != "string") throw AppError.badRequestError("Nombre de Empresa de Experiencia Laboral invalido o no ingresado");
        if (!experienciaLaboral.cargo || typeof experienciaLaboral.cargo != "string") throw AppError.badRequestError("Cargo de Experiencia Laboral invalido o no ingresado");
        if (!experienciaLaboral.rubro || typeof experienciaLaboral.rubro != "string") throw AppError.badRequestError("Rubro de Experiencia Laboral invalido o no ingresado");
        if (!experienciaLaboral.nivelJerarquico || typeof experienciaLaboral.nivelJerarquico != "string") throw AppError.badRequestError("Nivel Jerarquico de Experiencia Laboral invalido o no ingresado");
        if (experienciaLaboral.tareasRealizadas && typeof experienciaLaboral.tareasRealizadas != "string") throw AppError.badRequestError("Tareas Realizadas de Experiencia Laboral invalido o no ingresado");
        
        if (!experienciaLaboral.fechaInicio || typeof experienciaLaboral.fechaInicio != "string" || !Date.parse(experienciaLaboral.fechaInicio)) throw AppError.badRequestError("Fecha de Inicio de Experiencia Laboral invalido o no ingresado. Formato Valido: YYYY-MM-DD");
        
        if (typeof experienciaLaboral.trabajando != "boolean") throw AppError.badRequestError("Trabajando en Experiencia Laboral invalido o no ingresado");
        if (!experienciaLaboral.trabajando && (!experienciaLaboral.fechaFin || typeof experienciaLaboral.fechaFin != "string" || !Date.parse(experienciaLaboral.fechaFin))) throw AppError.badRequestError("Fecha de Fin de Experiencia Laboral invalido o no ingresado. Formato Valido: YYYY-MM-DD");

        const fechaInicio = moment(experienciaLaboral.fechaInicio, "YYYY-MM-DD");
        if (fechaInicio.isAfter(moment())) throw AppError.badRequestError("La Fecha Inicio debe ser anterior a la fecha actual");
        experienciaLaboral.fechaInicio = fechaInicio.toDate();

        if (!experienciaLaboral.trabajando) {
            const fechaFin = moment(experienciaLaboral.fechaFin, "YYYY-MM-DD");
            if (fechaFin.isAfter(moment())) throw AppError.badRequestError("La Fecha Fin debe ser anterior a la fecha actual");
            if (fechaFin.isSameOrBefore(fechaInicio)) throw AppError.badRequestError("La Fecha Fin debe ser posterior a la fecha de inicio");
            experienciaLaboral.fechaFin = fechaFin.toDate();
        } else {
            experienciaLaboral.fechaFin = undefined;
        }

        if (experienciaLaboral.nombreReferencia && typeof experienciaLaboral.nombreReferencia != "string") throw AppError.badRequestError("Nombre de Referencia de Experiencia Laboral invalido o no ingresado");
        if (experienciaLaboral.apellidoReferencia && typeof experienciaLaboral.apellidoReferencia != "string") throw AppError.badRequestError("Apellido Referencia de Experiencia Laboral invalido o no ingresado");
        if (experienciaLaboral.cargoReferencia && typeof experienciaLaboral.cargoReferencia != "string") throw AppError.badRequestError("Cargo Referencia de Experiencia Laboral invalido o no ingresado");
        if (experienciaLaboral.telefonoReferencia && typeof experienciaLaboral.telefonoReferencia != "string") throw AppError.badRequestError("Telefono Referencia de Experiencia Laboral invalido o no ingresado");
        if (experienciaLaboral.emailReferencia && typeof experienciaLaboral.emailReferencia != "string") throw AppError.badRequestError("Email de Referencia de Experiencia Laboral invalido o no ingresado");

        experienciaLaboral.postulante = postulante;
    }

    return experienciasLaborales;
}