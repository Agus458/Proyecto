import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { esEmpresa } from "../middlewares/esEmpresa";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import * as OffertaController from "../controllers/offerta.controller";


const router = Router();

router.get("/", [],handleRequest(OffertaController.getOfferta));

router.get(":/id",[],handleRequest(OffertaController.getOffertaById));

router.post("/",[isLoggedIn,esEmpresa],handleRequest(OffertaController.postOfferta));

router.put("/:id", [isLoggedIn,esEmpresa], handleRequest(OffertaController.putOfferta));

export default router;

