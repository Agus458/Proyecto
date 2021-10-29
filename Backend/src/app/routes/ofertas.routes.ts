import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";
import * as ofertasController from "../controllers/ofertas.controller";

const router = Router();

router.get("/", [], handleRequest(ofertasController.getOffertas));

router.get("/all", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(ofertasController.getAllOffertas));

router.get("/empresa", [isLoggedIn, tieneRol(["Empresa"])], handleRequest(ofertasController.getOffertaByEmpresa));

router.get("/empresa/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(ofertasController.getOffertaByEmpresa));

router.get("/postulante", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(ofertasController.getOffertaByPostulante));

router.get("/postulado/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(ofertasController.postulado));

router.get("/postulantes/:id", [isLoggedIn, tieneRol(["Empresa"])], handleRequest(ofertasController.getPostulantesOferta));

router.post("/inscribirse/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(ofertasController.inscribirseOfferta));

router.post("/", [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(ofertasController.realizarOfferta));

router.put("/:id", [isLoggedIn, tieneRol(["Administrador", "Empresa"])], handleRequest(ofertasController.realizarOfferta));

router.get("/:id", [], handleRequest(ofertasController.getOffertaById));

router.delete("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(ofertasController._delete));

export default router;