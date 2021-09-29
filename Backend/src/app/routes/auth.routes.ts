import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { cambiarContrasenia, iniciarSesion, registrarse, restablecerContrasenia, solicitarEmpresa } from "../controllers/auth.controller";

/* ---------------------------------------< AUTH ROUTES >--------------------------------------- */

const router = Router();

router.post("/registrarse", handleRequest(registrarse));

router.post("/iniciarSesion", handleRequest(iniciarSesion));

router.post("/solicitarEmpresa", handleRequest(solicitarEmpresa));

router.post("/restablecerContrasenia", handleRequest(restablecerContrasenia));

router.post("/cambiarContrasenia", handleRequest(cambiarContrasenia));

export default router;