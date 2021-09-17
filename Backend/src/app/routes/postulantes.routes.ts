import { Router } from "express";
import multer, { Field } from "multer";

import { handleRequest } from "../../config/error/handleRequest";
import * as postulantesController from "../controllers/postulantes.controller";
import { perfilStorage } from "../libraries/file.library";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { tieneRol } from "../middlewares/tieneRol";

/* ---------------------------------------< POSTULANTES ROUTES >--------------------------------------- */

const router = Router();

const fields: Field[] = [
    { name: "imagen", maxCount: 1 },
    { name: "cv", maxCount: 1 },
    { name: "certificados" }
];

const upload = multer({ storage: perfilStorage() });

router.get("/perfil", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.getPerfil));

router.get("/perfil/:id", [isLoggedIn, tieneRol(["Empresa", "Administrador"])], handleRequest(postulantesController.getPerfilById));

router.put("/perfil", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.putPostulante));

router.put("/perfil/archivos", [isLoggedIn, tieneRol(["Postulante"]), upload.fields(fields)], handleRequest(postulantesController.putArchivos));

export default router;