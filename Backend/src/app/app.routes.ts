import { Router } from "express";
import authRoutes from "./routes/auth.routes";

/* ---------------------------------------< API ROUTES >--------------------------------------- */

const router = Router();

// Rutas de autenticacion.
router.use("/auth", authRoutes);

export default router;