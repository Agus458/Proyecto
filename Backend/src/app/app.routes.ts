import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import postulantesRoutes from "./routes/postulantes.routes";
import paisesRoutes from "./routes/pasises.routes";
import departamentosRoutes from "./routes/departamentos.routes";
import offertaRouter from "./routes/offerta.router";

/* ---------------------------------------< API ROUTES >--------------------------------------- */

const router = Router();

// Rutas de autenticacion.
router.use("/auth", authRoutes);

router.use("/postulante", postulantesRoutes);

router.use("/paises", paisesRoutes);

router.use("/departamentos", departamentosRoutes);

router.use("/offerta", offertaRouter);
export default router;