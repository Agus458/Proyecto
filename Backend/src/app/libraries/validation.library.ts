import validator from "validator";

import { AppError } from "../../config/error/appError";
import { TipoDocumento } from "../models/enums"
import * as paisesService from "../services/paises.service";
import * as departamentosService from "../services/departamentos.service";
import * as localidadesService from "../services/localidades.service";
import moment from "moment";

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

    if(data.primerNombre && typeof data.primerNombre != "string") throw AppError.badRequestError("Primer Nombre invalido");
    if(data.segundoNombre && typeof data.segundoNombre != "string") throw AppError.badRequestError("Segundo Nombre invalido");
    if(data.primerApellido && typeof data.primerApellido != "string") throw AppError.badRequestError("Primer Apellido invalido");
    if(data.segundoApellido && typeof data.segundoApellido != "string") throw AppError.badRequestError("Segundo Apellido invalido");

    if (data.fechaNacimiento) {
        if (typeof data.fechaNacimiento != "string" || validator.isDate(data.fechaNacimiento)) throw AppError.badRequestError("Fecha de nacimiento invalida");
        const fechaNacimiento = moment(data.fechaNacimiento, "DD-MM-YYYY");
        if(fechaNacimiento.isAfter(moment())) throw AppError.badRequestError("Fecha de nacimiento debe ser anterior a la fecha actual");
        data.fechaNacimiento = fechaNacimiento.toDate();
    }
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
        if (typeof domicilio.pais != "string" || !validator.isInt(domicilio.pais)) throw AppError.badRequestError("Pais invalido");

        const pais = await paisesService.getById(domicilio.pais);
        if (!pais) throw AppError.badRequestError("No existe el pais ingresado");

        if (pais.nombre == "Uruguay") {
            if (!domicilio.departamento) throw AppError.badRequestError("No se ingreso el departamento de domicilio");
            if (!domicilio.localidad) throw AppError.badRequestError("No se ingreso la localidad de domicilio");
            if (typeof domicilio.departamento != "string" || !validator.isInt(domicilio.departamento)) throw AppError.badRequestError("Departamento invalido");
            if (typeof domicilio.localidad != "string" || !validator.isInt(domicilio.localidad)) throw AppError.badRequestError("Localidad invalida");

            const departamento = await departamentosService.getById(domicilio.departamento);
            if (!departamento) throw AppError.badRequestError("No existe el departamento ingresado");

            if (departamento.pais != pais) throw AppError.badRequestError("El departamento no pertence a pais ingresado");

            const localidad = await localidadesService.getById(domicilio.localidad);
            if (!localidad) throw AppError.badRequestError("No existe la localidad ingresado");

            if (localidad.departamento != departamento) throw AppError.badRequestError("La localidad no pertence al departamento ingresado");
        } else {
            domicilio.departamento = undefined;
            domicilio.localidad = undefined;
        }
    } else {
        domicilio = domicilioPostulante;
    }

    return domicilio;
}

export const validarCapacitaciones = (capacitaciones: any) => {
    if (capacitaciones! instanceof Array) throw AppError.badRequestError("Capacitaciones invalidas");

    capacitaciones.forEach((capacitacion: any) => {
        if (typeof capacitacion != "object") throw AppError.badRequestError("Capacitacion invalida");

    });
}