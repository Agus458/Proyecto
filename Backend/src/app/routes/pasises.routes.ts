import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import * as paisesController from "../controllers/pasises.controller";
import { esAdmin } from "../middlewares/esAdmin";
import { isLoggedIn } from "../middlewares/isLoggedIn";

/* ---------------------------------------< PAISES ROUTES >--------------------------------------- */

const router = Router();

router.get("/", [], handleRequest(paisesController.getPaises));

router.get("/:id", [], handleRequest(paisesController.getPaisById));

router.post("/", [isLoggedIn, esAdmin], handleRequest(paisesController.postPais));

router.put("/:id", [isLoggedIn, esAdmin], handleRequest(paisesController.putPais));

export default router;