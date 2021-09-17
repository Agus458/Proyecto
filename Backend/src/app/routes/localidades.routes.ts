import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as localidadesController from "../controllers/localidades.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< PAISES ROUTES >--------------------------------------- */

const router = Router();

router.get("/", [], handleRequest(localidadesController.getLocalidades));

router.get("/:id", [], handleRequest(localidadesController.getLocalidadById));

router.get("/departamento/:id", [], handleRequest(localidadesController.getLocalidadesByDepartamento));

router.post("/", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(localidadesController.postLocalidad));

router.put("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(localidadesController.putLocalidad));

export default router;