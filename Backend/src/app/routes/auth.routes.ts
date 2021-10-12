import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { cambiarContrasenia, confirmarSolicitud, iniciarSesion, iniciarSocial, registrarse, restablecerContrasenia, solicitarEmpresa } from "../controllers/auth.controller";

/* ---------------------------------------< AUTH ROUTES >--------------------------------------- */

const router = Router();

router.post("/registrarse", handleRequest(registrarse));

router.post("/iniciarSesion", handleRequest(iniciarSesion));

router.post("/solicitarEmpresa", handleRequest(solicitarEmpresa));

router.post("/confirmarSolicitud", handleRequest(confirmarSolicitud));

router.post("/restablecerContrasenia", handleRequest(restablecerContrasenia));

router.post("/cambiarContrasenia", handleRequest(cambiarContrasenia));

router.post("/iniciarSocial", handleRequest(iniciarSocial));

//router.post("/CrearOfferta", handleRequest())
export default router;