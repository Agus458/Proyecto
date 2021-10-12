import express, { Router } from "express";
import { esPublico } from "../middlewares/esPublico";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = Router();

// Configuracion del directorio de archivos subidos.
router.use("/perfil", [isLoggedIn, esPublico], express.static("uploads/perfil"));

router.use("/novedades", [], express.static("uploads/novedades"));

export default router;