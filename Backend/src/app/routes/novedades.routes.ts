import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as novedadesController from "../controllers/novedades.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< NOVEDADES ROUTES >--------------------------------------- */

const router = Router();

router.get("/", [], handleRequest(novedadesController.getAll));

router.get("/:id", [], handleRequest(novedadesController.getById));

router.post("/", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(novedadesController.post));

router.put("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(novedadesController.put));

export default router;