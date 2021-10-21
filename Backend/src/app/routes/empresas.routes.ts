import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as empresasController from "../controllers/empresas.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< LOCALIDADES ROUTES >--------------------------------------- */

const router = Router();

router.get("/pendientes", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(empresasController.getPendientes));

router.get("/", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(empresasController.getAll));

router.get("/:id", [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(empresasController.getById));

router.put("/", [isLoggedIn, tieneRol(["Empresa"])], handleRequest(empresasController.put));

router.put("/",[isLoggedIn,tieneRol(["Empresa"])], handleRequest(empresasController.put));

export default router;



