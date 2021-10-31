import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as administradoresController from "../controllers/administradores.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< LOCALIDADES ROUTES >--------------------------------------- */

const router = Router();

router.put("/habilitarEmpresa/:id", [isLoggedIn, tieneRol(['Administrador'])], handleRequest(administradoresController.habilitarEmpresa));

router.get("/dashboard", [isLoggedIn, tieneRol(['Administrador'])], handleRequest(administradoresController.getDashboard));

router.get("/charts", [isLoggedIn, tieneRol(['Administrador'])], handleRequest(administradoresController.getChartsData));

export default router;