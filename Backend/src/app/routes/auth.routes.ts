import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import {  registrarse, solicitarEmpresa,CrearOfferta ,confirmarSolicitud,restablecerContrasenia,cambiarContrasenia,iniciarSocial} from "../controllers/auth.controller";

/* ---------------------------------------< AUTH ROUTES >--------------------------------------- */

const router = Router();

router.post("/registrarse", handleRequest(registrarse));





router.post("/CrearOfferta", handleRequest(CrearOfferta));

//router.post("/InscribirseAOfferta",handleRequest(InscribirseAOfferta));
router.post("/solicitarEmpresa", handleRequest(solicitarEmpresa));

router.post("/confirmarSolicitud", handleRequest(confirmarSolicitud));

router.post("/restablecerContrasenia", handleRequest(restablecerContrasenia));

router.post("/cambiarContrasenia", handleRequest(cambiarContrasenia));

router.post("/iniciarSocial", handleRequest(iniciarSocial));

export default router;