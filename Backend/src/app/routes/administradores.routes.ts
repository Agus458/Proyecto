import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as administradoresController from "../controllers/administradores.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< LOCALIDADES ROUTES >--------------------------------------- */

const router = Router();

router.put("/habilitarEmpresa/:id", handleRequest(administradoresController.habilitarEmpresa));

export default router;