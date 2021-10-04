import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as empresasController from "../controllers/empresas.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< LOCALIDADES ROUTES >--------------------------------------- */

const router = Router();

router.put("/pendientes", handleRequest(empresasController.getPendientes));

router.put("/:id", handleRequest(empresasController.getById));

export default router;