import { Request, Response } from "express";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { AppError } from "../../config/error/appError";
import { encryptPassword } from "../libraries/encryptation.library";

import * as postulantesService from "../services/postulantes.service";
import * as usuariosService from "../services/usuarios.service";
import * as empresasService from "../services/empresas.service";
import * as localidadesService from "../services/localidades.service";
import * as appSociosService from "../services/appSocios.service";
import * as restablecerContraseniaService from "../services/restablecerContrasenia.service";
import * as solicitudesEmpresaService from "../services/solicitudesEmpresa.service";
import * as offertaService from "../services/offerta.service";
import { createToken, verifyToken } from "../libraries/tokens.library";
import { EstadoUsuario } from "../models/enums";
import { resetTemplate, sendEmail } from "../libraries/email.library";
import { verifyGoogleIdToken } from "../libraries/google.library";
import { Empresa } from "../models/empresa.model";
import moment from "moment";
import { request } from "http";

/* ---------------------------------------< AUTH CONTROLLER >--------------------------------------- */
/*
export const publicarOfferta = async(request: Request, response: Response):Promise<Response>=>{
    if(!request.body.)

}
*/
export const registrarse = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
    if (!validator.isEmail(request.body.email)) throw AppError.badRequestError("El email ingresado no es valido");

    if (await usuariosService.getByEmail(request.body.email)) throw AppError.badRequestError("Ya existe un usuario con el email ingresado");

    request.body.contrasenia = await encryptPassword(request.body.contrasenia);
    request.body.estado = EstadoUsuario.ACTIVO;

    const result = await postulantesService.post(request.body);

    const { token, exp } = createToken(result.email);

    return response.status(201).json({ usuario: { email: result.email, tipo: result.constructor.name }, token, exp });
}

export const iniciarSesion = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");

    const usuario = await usuariosService.getByEmailContrasenia(request.body.email, request.body.contrasenia);

    if (!usuario) throw AppError.badRequestError("Credenciales Invalidas");

    if (usuario.estado != EstadoUsuario.ACTIVO) throw AppError.badRequestError("El usuario no se encuentra activo");

    if (usuario.constructor.name == "Empresa") {
        const empresa: Empresa = usuario as Empresa;
        if (moment().isAfter(moment(empresa.vencimiento))) {
            empresa.estado = EstadoUsuario.INACTIVO;
            await usuariosService.actualizar(empresa);
            throw AppError.badRequestError("La fecha de utlizacion ya expiro");
        }
    }

    const { token, exp } = createToken(usuario.email);

    return response.status(200).json({ usuario: { email: usuario.email, tipo: usuario.constructor.name }, token, exp });
}

export const solicitarEmpresa = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.rut) throw AppError.badRequestError("No se ingreso el rut de la empresa");

    let empresa = await empresasService.getByRut(request.body.rut);
    if (!empresa) {
        request.body.contrasenia = await encryptPassword(request.body.rut);
        request.body.estado = EstadoUsuario.PENDIENTE;

        const empresaAppSocios = await appSociosService.getEmpresa(request.body.rut);

        if (empresaAppSocios) {
            const localidadAppSocios = await appSociosService.getLocalidad(empresaAppSocios.localidadId);
            if (localidadAppSocios) {
                const localidad = await localidadesService.getByNombre(localidadAppSocios.name);
                request.body.localidad = localidad;
            }

            request.body.razonSocial = empresaAppSocios.razon_social;
            request.body.socia = empresaAppSocios.activa;
            request.body.telefono = empresaAppSocios.telefono;
            request.body.nombreFantasia = empresaAppSocios.nombre_fantasia;
        }

        empresa = await empresasService.post(request.body);
    }

    if (moment().isBefore(moment(empresa.vencimiento)) && empresa.estado == EstadoUsuario.ACTIVO) throw AppError.badRequestError("Empresa Activa");

    empresa.estado = EstadoUsuario.PENDIENTE;
    await usuariosService.actualizar(empresa);

    const token = jwt.sign({ rut: empresa.rut }, process.env.SECRET + empresa.contrasenia as string);

    await solicitudesEmpresaService.post(token, empresa.rut.toString());

    return response.json({ token, rut: empresa.rut });
}

export const confirmarSolicitud = async (request: Request, response: Response): Promise<Response> => {
    const token = request.body.token;
    if (typeof token != "string") throw AppError.badRequestError("No se ingreso el token");
    if (typeof request.body.contrasenia != "string") throw AppError.badRequestError("No se ingreso la nueva contraseña");
    if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
    if (!validator.isEmail(request.body.email)) throw AppError.badRequestError("El email ingresado no es valido");

    if (await usuariosService.getByEmail(request.body.email)) throw AppError.badRequestError("Ya existe un usuario con el email ingresado");

    const rest = await solicitudesEmpresaService.getByToken(token);
    if (!rest) throw AppError.badRequestError("Token invalido");

    const empresa = await empresasService.getByRut(rest.rut);
    if (!empresa) throw AppError.badRequestError("No existe la empresa");

    const data = verifyToken(token, process.env.SECRET + empresa.contrasenia as string);
    if (!data) throw AppError.badRequestError("Token ya utilizado o invalido");

    empresa.email = request.body.email;
    empresa.nombreFantasia = request.body.nombreFantasia;
    empresa.localidad = request.body.localidad;
    empresa.razonSocial = request.body.razonSocial;
    empresa.telefono = request.body.telefono;
    empresa.visibilidad = request.body.visibilidad;
    empresa.contrasenia = await encryptPassword(request.body.contrasenia);

    usuariosService.actualizar(empresa);

    sendEmail("aguperaza458@gmail.com", "Solicitud de Empresa", `La empresa ${empresa.razonSocial} con rut ${empresa.rut} solicita la habilitacion de su usuario.`);

    return response.status(200).json();
}

export const restablecerContrasenia = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.body.email != "string") throw AppError.badRequestError("Email invalido o no ingresado");

    const usuario = await usuariosService.getContraseniaByEmail(request.body.email);
    if (!usuario) throw AppError.badRequestError("No existe un usuario con el email ingresado");

    const token = jwt.sign({ email: usuario.email }, process.env.SECRET + usuario.contrasenia as string, { expiresIn: "15m" });

    await restablecerContraseniaService.post(token, usuario.email);

    sendEmail(usuario.email, "Restablecer Contrasenia", resetTemplate(token));

    return response.status(204).json();
}

export const cambiarContrasenia = async (request: Request, response: Response): Promise<Response> => {
    const token = request.body.token;
    if (typeof token != "string") throw AppError.badRequestError("No se ingreso el token");
    if (typeof request.body.contrasenia != "string") throw AppError.badRequestError("No se ingreso la nueva contraseña");

    const rest = await restablecerContraseniaService.getByToken(token);
    if (!rest) throw AppError.badRequestError("Token invalido");

    const usuario = await usuariosService.getContraseniaByEmail(rest.email);
    if (!usuario) throw AppError.badRequestError("No existe el usuario");

    const email = verifyToken(token, process.env.SECRET + usuario.contrasenia as string);

    if (!email) throw AppError.badRequestError("Token ya utilizado o invalido");

    usuario.contrasenia = await encryptPassword(request.body.contrasenia);

    usuariosService.actualizar(usuario);

    return response.status(200).json();
}

export const iniciarSocial = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.user) throw AppError.badRequestError("No se ingreso el usuario");
    if (!request.body.user.email) throw AppError.badRequestError("No se ingreso el email del usuario");

    if (request.body.user.provider == "GOOGLE") {
        if (! await verifyGoogleIdToken(request.body.user.idToken)) throw AppError.badRequestError("Token de sesion invalido");
    } else {
        throw AppError.badRequestError("Proveedor Invalido");
    }

    let usuario = await usuariosService.getByEmail(request.body.user.email);
    if (!usuario) {
        request.body.estado = EstadoUsuario.ACTIVO;

        usuario = await postulantesService.post({
            email: request.body.user.email,
            contrasenia: await encryptPassword(crypto.randomBytes(20).toString('hex')),
            estado: EstadoUsuario.ACTIVO
        });
    }

    const { token, exp } = createToken(usuario.email);

    return response.status(200).json({ usuario: { email: usuario.email, tipo: usuario.constructor.name }, token, exp });
}
/*
export const putOfferta= async (request:Request,response:Response):Promise<Response>=>{
    if(!request.body.nombreEmpresa) throw AppError.badRequestError("No se ingreso el nombre de la localidad");
    //if(!request.body.RutEmpresa) throw AppError.badRequestError("No se ingreso el el Runt de la offerta");
    
    const offerta = await offertaService.getById(request.body.offerta);
    if(!offerta) throw AppError.badRequestError("No existe ningun departamento con el id ingresado");
    await offertaService.post(request.body);
    return response.status(201).json();
    }
*/
  export const realizarOfferta = async (request: Request, response: Response): Promise<Response> => {
    //  if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
   // if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
    if (!request.body.nombreEmpresa) throw AppError.badRequestError("No se ingreso el email");
  //  const usuario = await usuariosService.getByEmailContrasenia(request.body.email, request.body.contrasenia);
 //  if (!usuario) throw AppError.badRequestError("Credenciales Invalidas");
   
   // if (usuario.estado != EstadoUsuario.ACTIVO) throw AppError.badRequestError("El usuario no se encuentra activo");
const result = await offertaService.post(request.body);
/*
    
    const { token, exp } = createToken(result.email);
*/
  //return response.status(201).json({ usuario: { email: result.email, tipo: result.constructor.name },token,exp });
     return response.status(201).json();
      }
/*
    export const realizarOfferta = async (request: Request, response: Response): Promise<Response> => {
       if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
        if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
         if (!validator.isEmail(request.body.email)) throw AppError.badRequestError("El email ingresado no es valido");
         if (await usuariosService.getByEmail(request.body.email)) throw AppError.badRequestError("Ya existe un usuario con el email ingresado");
                
                if (!usuario) throw AppError.badRequestError("Credenciales Invalidas");
               
                 if (usuario.estado != EstadoUsuario.ACTIVO) throw AppError.badRequestError("El usuario no se encuentra activo");
         
        
        }
        const result = await offertaService.post(request.body);

   

     return response.status(201).json();
    }
    */
    /*if (!request.body.nombreEmpresa) throw AppError.badRequestError("No se ingreso el email");
    if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");
    if (!validator.isEmail(request.body.email)) throw AppError.badRequestError("El email ingresado no es valido");
*/
   // if (await offertaService.getByNombreEmpresa(request.body.nombreEmpresa)) throw AppError.badRequestError("Ya existe un usuario con el email ingresado");

    //request.body.contrasenia = await encryptPassword(request.body.contrasenia);
   // request.body.estado = EstadoUsuario.ACTIVO;

    


