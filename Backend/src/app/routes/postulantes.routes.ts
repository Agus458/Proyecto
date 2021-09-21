import { Router } from "express";
import multer from "multer";

import { handleRequest } from "../../config/error/handleRequest";
import * as postulantesController from "../controllers/postulantes.controller";
import { perfilStorage } from "../libraries/file.library";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< POSTULANTES ROUTES >--------------------------------------- */

const router = Router();

const upload = multer({ storage: perfilStorage() });

router.get("/perfil", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.getPerfil));

router.get("/perfil/:id", [isLoggedIn, tieneRol(["Empresa", "Administrador"])], handleRequest(postulantesController.getPerfilById));

router.put("/perfil", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.putPostulante));

router.put("/perfil/imagen", [isLoggedIn, tieneRol(["Postulante"]), upload.single("imagen")], handleRequest(postulantesController.putImagen));

export default router;