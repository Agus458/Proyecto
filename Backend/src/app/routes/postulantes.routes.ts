import { Router } from "express";
import multer, { Field } from "multer";

import { handleRequest } from "../../config/error/handleRequest";
import * as postulantesController from "../controllers/postulantes.controller";
import { perfilStorage } from "../libraries/file.library";
import { esAdmin } from "../middlewares/esAdmin";
import { esEmpresa } from "../middlewares/esEmpresa";
import { esPostulante } from "../middlewares/esPostulante";
import { isLoggedIn } from "../middlewares/isLoggedIn";

/* ---------------------------------------< POSTULANTES ROUTES >--------------------------------------- */

const router = Router();

const fields: Field[] = [
    { name: "imagen", maxCount: 1 },
    { name: "cv", maxCount: 1 }
];

const upload = multer({ storage: perfilStorage() });

router.get("/perfil", [isLoggedIn, esPostulante], handleRequest(postulantesController.getPerfil));

router.get("/perfil/:id", [isLoggedIn, esAdmin || esEmpresa], handleRequest(postulantesController.getPerfilById));

router.put("/", [isLoggedIn, esPostulante, upload.fields(fields)], handleRequest(postulantesController.putPostulante));

export default router;