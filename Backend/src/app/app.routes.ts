import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import postulantesRoutes from "./routes/postulantes.routes";

/* ---------------------------------------< API ROUTES >--------------------------------------- */

const router = Router();

// Rutas de autenticacion.
router.use("/auth", authRoutes);

router.use("/postulante", postulantesRoutes);

export default router;