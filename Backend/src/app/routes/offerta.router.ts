import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { esEmpresa } from "../middlewares/esEmpresa";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import * as OffertaController from "../controllers/offerta.controller";
import { esAdmin } from "../middlewares/esAdmin";


const router = Router();

router.get("/", [],handleRequest(OffertaController.getOfferta));

router.get(":/id",[],handleRequest(OffertaController.getOffertaById));
//Este es el que hay que usar
/*
router.post("/",[isLoggedIn,esEmpresa],handleRequest(OffertaController.postOfferta));

router.put("/:id", [isLoggedIn,esEmpresa], handleRequest(OffertaController.putOfferta));
*/

router.post("/",[isLoggedIn,esAdmin],handleRequest(OffertaController.postOfferta));

router.put("/:id", [isLoggedIn,esAdmin], handleRequest(OffertaController.putOfferta));
export default router;

