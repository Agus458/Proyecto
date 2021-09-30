import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { iniciarSesion, registrarse, solicitarEmpresa,CrearOfferta } from "../controllers/auth.controller";

/* ---------------------------------------< AUTH ROUTES >--------------------------------------- */

const router = Router();

router.post("/registrarse", handleRequest(registrarse));

router.post("/iniciarSesion", handleRequest(iniciarSesion));

router.post("/solicitarEmpresa", handleRequest(solicitarEmpresa));

router.post("/CrearOfferta", handleRequest(CrearOfferta));

//router.post("/InscribirseAOfferta",handleRequest(InscribirseAOfferta));

export default router;