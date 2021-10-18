import { Router } from "express";
import multer from "multer";
import { handleRequest } from "../../config/error/handleRequest";
import * as novedadesController from "../controllers/novedades.controller";
import { imagenNovedadStorage } from "../libraries/file.library";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< NOVEDADES ROUTES >--------------------------------------- */

const router = Router();

const upload = multer({ storage: imagenNovedadStorage() });

router.get("/", [], handleRequest(novedadesController.getAll));

router.get("/:id", [], handleRequest(novedadesController.getById));

router.post("/", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(novedadesController.post));

router.put("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(novedadesController.put));

router.delete("/:id", [isLoggedIn, tieneRol(["Administrador"])], handleRequest(novedadesController._delete));

router.put("/imagen/:id", [isLoggedIn, tieneRol(["Administrador"]), upload.single("imagen")], handleRequest(novedadesController.putImagen));

export default router;