import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as departamentosController from "../controllers/departamentos.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< PAISES ROUTES >--------------------------------------- */

const router = Router();

router.get("/", [], handleRequest(departamentosController.getDepartamentos));

router.get("/:id", [], handleRequest(departamentosController.getDepartamentoById));

router.get("/pais/:id", [], handleRequest(departamentosController.getDepartamentosByPais));

router.post("/", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(departamentosController.postDepartamento));
tieneRol
router.put("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(departamentosController.putDepartamento));

export default router;