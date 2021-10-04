import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as paisesController from "../controllers/pasises.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< PAISES ROUTES >--------------------------------------- */

const router = Router();

router.get("/", [], handleRequest(paisesController.getPaises));

router.get("/:id", [], handleRequest(paisesController.getPaisById));

router.post("/", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(paisesController.postPais));

router.put("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(paisesController.putPais));

export default router;