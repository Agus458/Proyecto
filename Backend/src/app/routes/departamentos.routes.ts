import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as departamentosController from "../controllers/departamentos.controller";
import { esAdmin } from "../middlewares/esAdmin";
import { isLoggedIn } from "../middlewares/isLoggedIn";

/* ---------------------------------------< PAISES ROUTES >--------------------------------------- */

const router = Router();

router.get("/", [], handleRequest(departamentosController.getDepartamentos));

router.get("/:id", [], handleRequest(departamentosController.getDepartamentoById));

router.get("/pais/:id", [], handleRequest(departamentosController.getDepartamentosByPais));

router.post("/", [isLoggedIn, esAdmin], handleRequest(departamentosController.postDepartamento));

router.put("/:id", [isLoggedIn, esAdmin], handleRequest(departamentosController.putDepartamento));



export default router;