import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { putPostulante } from "../controllers/postulantes.controller";
import { esPostulante } from "../middlewares/esPostulante";
import { isLoggedIn } from "../middlewares/isLoggedIn";

/* ---------------------------------------< POSTULANTES ROUTES >--------------------------------------- */

const router = Router();

router.put("/", [isLoggedIn, esPostulante], handleRequest(putPostulante));

export default router;