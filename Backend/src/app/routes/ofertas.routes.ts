import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";
import * as ofertasController from "../controllers/ofertas.controller";

const router = Router();

router.get("/:id", [], handleRequest(ofertasController.getOffertaById));

router.get("/", [], handleRequest(ofertasController.getOffertas));

router.post("/inscribirse/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(ofertasController.inscribirseOfferta));

router.post("/", [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(ofertasController.realizarOfferta));

router.put("/:id", [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(ofertasController.realizarOfferta));

export default router;