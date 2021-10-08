import { Router } from "express";
import { NivelEducativo } from "../models/perfil/nivel-educativo";
import * as profileController from "../controllers/profile.controller";
import { Estado } from "../models/perfil/estado";
import { AreaTematica } from "../models/perfil/area-tematica";

const router = Router();

// NivelEducativo
router.get("/nivelesEducativos", profileController.get(NivelEducativo.prototype));

// EstadoNivelEducativo
router.get("/estadosNivelEducativo", profileController.get(Estado.prototype));

// AreaTematica
router.get("/areasTematicas", profileController.get(AreaTematica.prototype));

export default router;