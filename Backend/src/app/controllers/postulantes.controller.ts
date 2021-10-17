import { Request, Response } from "express";
import validator from "validator";
import pdf from "html-pdf";

import { AppError } from "../../config/error/appError";
import { removerArchivo } from "../libraries/file.library";
import { validarCapacitaciones, validarConocimientoInformatico, validarDatosPersonales, validarDomicilio, validarExperienciasLaborales, validarIdiomas, validarPermisos, validarPreferenciasLaborales } from "../libraries/validation.library";
import * as postulantesService from "../services/postulantes.service";
import * as capacitacionesService from "../services/capacitaciones.service";
import * as conocimientosInformaticosService from "../services/conocimientos.service";
import * as experienciasLaboralesService from "../services/experienciasLaborales.service";
import * as idiomasService from "../services/idiomas.service";
import * as permisosService from "../services/permisos.service";
import * as preferenciasLaboralesService from "../services/preferenciasLaborales.service";
import { getImagen, profileTemplatePDF } from "../libraries/pdf.library";
import * as offertaService from "../services/offerta.service";
import { baseDir } from "../app.server";

/* ---------------------------------------< POSTULANTES CONTROLLER >--------------------------------------- */

// Perfil

export const getPerfil = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);

    return response.status(200).json(postulante);
}

export const getPerfilById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del postulante");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const postulante = await postulantesService.getPerfilById(Number.parseInt(request.params.id));

    if (!postulante) throw AppError.badRequestError("No existe un postulante con el id ingresado");

    if (!postulante.perfilPublico) throw AppError.badRequestError("Este perfil es privado");

    return response.status(200).json(postulante);
}

export const putPostulante = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");

    // Validacion de datos personales del Postulante.
    await validarDatosPersonales(request.body);

    // Validacion del domicilio.
    request.body.domicilio = await validarDomicilio(request.body.domicilio, postulante.domicilio);

    if (request.body.capacitaciones) {
        request.body.capacitaciones = await validarCapacitaciones(request.body.capacitaciones, postulante);
    }

    if (request.body.conocimientosInformaticos) {
        request.body.conocimientosInformaticos = await validarConocimientoInformatico(request.body.conocimientosInformaticos, postulante);
    }

    if (request.body.idiomas) {
        request.body.idiomas = await validarIdiomas(request.body.idiomas, postulante);
    }

    if (request.body.experienciasLaborales) {
        request.body.experienciasLaborales = await validarExperienciasLaborales(request.body.experienciasLaborales, postulante);
    }

    if (request.body.permisos) {
        request.body.permisos = await validarPermisos(request.body.permisos, postulante);
    }

    if (request.body.preferenciasLaborales) {
        request.body.preferenciasLaborales = await validarPreferenciasLaborales(request.body.preferenciasLaborales, postulante);
    }

    await postulantesService.put(postulante.id, request.body);

    return response.status(201).json();
}

export const putImagen = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");

    // Validacion de archivos
    if (request.file) {
        if (postulante.imagen) {
            removerArchivo(postulante.imagen);
        }
        postulante.imagen = request.file.destination + "/" + request.file.filename;
    }

    await postulantesService.put(postulante.id, postulante);

    return response.status(201).json();
}

export const putCV = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");

    // Validacion de archivos
    if (request.file) {
        if (postulante.cv) {
            removerArchivo(postulante.cv);
        }
        postulante.cv = request.file.destination + "/" + request.file.filename;
    }

    await postulantesService.put(postulante.id, postulante);

    return response.status(201).json();
}

export const deleteCapacitcion = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const capacitacionGuardado = await capacitacionesService.getById(Number.parseInt(request.params.id));
    if (!capacitacionGuardado) throw AppError.badRequestError("No existe una Capacitacion con el id: " + request.params.id);
    if (capacitacionGuardado.postulante.id != postulante.id) throw AppError.badRequestError("La Capacitacion con el id: " + request.params.id + " no pretenece al usuario");

    capacitacionesService._delete(Number.parseInt(request.params.id));

    return response.status(200).json();
}

export const deleteConocimientoInformatico = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const conocimientoGuardado = await conocimientosInformaticosService.getById(Number.parseInt(request.params.id));
    if (!conocimientoGuardado) throw AppError.badRequestError("No existe un Conocimiento Informatico con el id: " + request.params.id);
    if (conocimientoGuardado.postulante.id != postulante.id) throw AppError.badRequestError("L Conocimiento Informatico con el id: " + request.params.id + " no pretenece al usuario");

    conocimientosInformaticosService._delete(Number.parseInt(request.params.id));

    return response.status(200).json();
}

export const deleteExperienciaLaboral = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const saved = await experienciasLaboralesService.getById(Number.parseInt(request.params.id));
    if (!saved) throw AppError.badRequestError("No existe una Experiencia Laboral con el id: " + request.params.id);
    if (saved.postulante.id != postulante.id) throw AppError.badRequestError("La Experiencia Laboral con el id: " + request.params.id + " no pretenece al usuario");

    experienciasLaboralesService._delete(Number.parseInt(request.params.id));

    return response.status(200).json();
}

export const deleteIdioma = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const saved = await idiomasService.getById(Number.parseInt(request.params.id));
    if (!saved) throw AppError.badRequestError("No existe un Idioma con el id: " + request.params.id);
    if (saved.postulante.id != postulante.id) throw AppError.badRequestError("El Idioma con el id: " + request.params.id + " no pretenece al usuario");

    idiomasService._delete(Number.parseInt(request.params.id));

    return response.status(200).json();
}

export const deletePermiso = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const saved = await permisosService.getById(Number.parseInt(request.params.id));
    if (!saved) throw AppError.badRequestError("No existe un Permiso con el id: " + request.params.id);
    if (saved.postulante.id != postulante.id) throw AppError.badRequestError("El Permiso con el id: " + request.params.id + " no pretenece al usuario");

    permisosService._delete(Number.parseInt(request.params.id));

    return response.status(200).json();
}

export const deletePreferenciaLaboral = async (request: Request, response: Response): Promise<Response> => {
    const postulante = await postulantesService.getPerfilById(request.user.id);
    if (!postulante) throw AppError.badRequestError("No se encontro el postulante");
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const saved = await preferenciasLaboralesService.getById(Number.parseInt(request.params.id));
    if (!saved) throw AppError.badRequestError("No existe una Preferencia Laboral con el id: " + request.params.id);
    if (saved.postulante.id != postulante.id) throw AppError.badRequestError("La Preferencia Laboral con el id: " + request.params.id + " no pretenece al usuario");

    preferenciasLaboralesService._delete(Number.parseInt(request.params.id));

    return response.status(200).json();
}

// General

export const getPostulantes = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await postulantesService.getFiltered(request.query));
}

export const generatePDF = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id) throw AppError.badRequestError("No se ingreso el id del postulante");
    if (!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const postulante = await postulantesService.getPerfilById(Number.parseInt(request.params.id));

    if (!postulante) throw AppError.badRequestError("No existe un postulante con el id ingresado");

    if (!postulante.perfilPublico) throw AppError.badRequestError("Este perfil es privado");
    
    pdf.create(await profileTemplatePDF(request.protocol + "://" + request.get("Host"), postulante, request.token)).toBuffer((err, res) => {
        if(err) return Promise.reject;

        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');

        return response.end(res);
    });

    return response;
}
export const inscribirseOfferta = async (request:Request, response: Response):Promise<Response> => {
    if(!request.params.id) throw AppError.badRequestError("No se ingreso el id del postulante");
    if(!validator.isInt(request.params.id)) throw AppError.badRequestError("El id ingresado no es valido");

    const offerta= await offertaService.getById(Number.parseInt(request.params.id));
  // const postulante= await postulantesService.getById(Number.parseInt(request.user.id));
    offerta?.Postulantes.push(request.user.id);
   // await offertaService.guardarPostulante(Number.parseInt(request.user.id));


    return response.status(201).json();

    

  

}