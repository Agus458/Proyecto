import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { iniciarSesion, registrarse, solicitarEmpresa } from "../controllers/auth.controller";

/* ---------------------------------------< AUTH ROUTES >--------------------------------------- */

const router = Router();

router.post("/registrarse", handleRequest(registrarse));

router.post("/iniciarSesion", handleRequest(iniciarSesion));

router.post("/solicitarEmpresa", handleRequest(solicitarEmpresa));

export default router;