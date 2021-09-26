import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as localidadesController from "../controllers/localidades.controller";
import { esEmpresa } from "../middlewares/esEmpresa";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import * as OffertaController from "../controllers/offerta.controller";
import { Formulario } from "../models/Formulario.model";
import { esPostulante } from "../middlewares/esPostulante";

const router = Router();

router.get("/", [],handleRequest(OffertaController.getOfferta));

router.get(":/id",[],handleRequest(OffertaController.getOffertaById));

router.post("/",[isLoggedIn,esPostulante],handleRequest(OffertaController.postOfferta));

router.put("/:id", [isLoggedIn,esPostulante], handleRequest(OffertaController.putOfferta));

export default router;

