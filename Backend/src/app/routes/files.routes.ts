import express, { Router } from "express";
import { esPublico } from "../middlewares/esPublico";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = Router();

// Configuracion del directorio de archivos subidos.
router.use("/perfil", [isLoggedIn, esPublico], express.static("uploads/perfil"));

export default router;