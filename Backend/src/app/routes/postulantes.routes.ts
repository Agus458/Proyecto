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

// Rutas Perfil de Postulante

router.get("/perfil", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.getPerfil));

router.get("/perfil/:id", [isLoggedIn, tieneRol(["Empresa", "Administrador"])], handleRequest(postulantesController.getPerfilById));


router.put("/perfil", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.putPostulante));

router.put("/perfil/imagen", [isLoggedIn, tieneRol(["Postulante"]), upload.single("imagen")], handleRequest(postulantesController.putImagen));

router.put("/perfil/cv", [isLoggedIn, tieneRol(["Postulante"]), upload.single("cv")], handleRequest(postulantesController.putCV));


router.delete("/perfil/capacitacion/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.deleteCapacitcion));

router.delete("/perfil/conocimientoInformatico/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.deleteConocimientoInformatico));

router.delete("/perfil/experienciaLaboral/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.deleteExperienciaLaboral));

router.delete("/perfil/idioma/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.deleteIdioma));

router.delete("/perfil/permiso/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.deletePermiso));

router.delete("/perfil/preferenciaLaboral/:id", [isLoggedIn, tieneRol(["Postulante"])], handleRequest(postulantesController.deletePreferenciaLaboral));

// Rutas Postulante

router.get("/", [isLoggedIn, tieneRol(["Empresa", "Administrador"])], handleRequest(postulantesController.getPostulantes))

export default router;