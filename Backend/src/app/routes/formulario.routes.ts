import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { esPostulante } from "../middlewares/esPostulante";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import * as formularioController from "../controllers/formulario.controller";
const router = Router();

router.get("/", [],handleRequest(formularioController.getFormulario));

router.get(":/id", [], handleRequest(formularioController.getFormularioById));

router.post("/", [isLoggedIn,esPostulante],handleRequest(formularioController.postFormulario));

router.put("/:id", [isLoggedIn,esPostulante], handleRequest(formularioController.putFormulario));

export default router;