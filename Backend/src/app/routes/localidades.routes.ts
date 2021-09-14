import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as localidadesController from "../controllers/localidades.controller";
import { esAdmin } from "../middlewares/esAdmin";
import { isLoggedIn } from "../middlewares/isLoggedIn";

/* ---------------------------------------< PAISES ROUTES >--------------------------------------- */

const router = Router();

router.get("/", [], handleRequest(localidadesController.getLocalidades));

router.get("/:id", [], handleRequest(localidadesController.getLocalidadById));

router.get("/departamento/:id", [], handleRequest(localidadesController.getLocalidadesByDepartamento));

router.post("/", [isLoggedIn, esAdmin], handleRequest(localidadesController.postLocalidad));

router.put("/:id", [isLoggedIn, esAdmin], handleRequest(localidadesController.putLocalidad));

export default router;