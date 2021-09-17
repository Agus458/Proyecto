import validator from "validator";

import { AppError } from "../../config/error/appError";
import { Domicilio } from "../models/domicilio.model";
import { TipoDocumento } from "../models/enums"
import * as paisesService from "../services/paises.service";
import * as departamentosService from "../services/departamentos.service";
import * as localidadesService from "../services/localidades.service";

// Valida que el documento y el tipo correspondiente sean correctos.
export const validarDocumento = (tipoDocumento: TipoDocumento | undefined, documento: string | undefined) => {
    if (!documento) throw AppError.badRequestError("Falta el documento del postulante");
    if (!tipoDocumento) throw AppError.badRequestError("Falta el tipo del documento del postulante");
    if (!TipoDocumento[tipoDocumento]) throw AppError.badRequestError("Tipo de documento invalido");

    if (tipoDocumento.valueOf() == TipoDocumento.CI.valueOf() && (!validator.isInt(documento) || !validator.isLength(documento, { max: 8, min: 8 }))) throw AppError.badRequestError("Cedula invalida");
    if (tipoDocumento.valueOf() == TipoDocumento.PASAPORTE.valueOf() && !validator.isPassportNumber(documento, "UY")) throw AppError.badRequestError("Pasaporte invalido");
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