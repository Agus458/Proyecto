import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import postulantesRoutes from "./routes/postulantes.routes";
import paisesRoutes from "./routes/pasises.routes";
import departamentosRoutes from "./routes/departamentos.routes";
import localidadesRoutes from "./routes/localidades.routes";
import novedadesRoutes from "./routes/novedades.routes";
import administradoresRoutes from "./routes/administradores.routes";
import empresasRoutes from "./routes/empresas.routes";

/* ---------------------------------------< API ROUTES >--------------------------------------- */

const router = Router();

// Rutas de autenticacion.
router.use("/auth", authRoutes);

router.use("/postulantes", postulantesRoutes);

router.use("/paises", paisesRoutes);

router.use("/departamentos", departamentosRoutes);

router.use("/localidades", localidadesRoutes);

router.use("/novedades", novedadesRoutes);

router.use("/administradores", administradoresRoutes);

router.use("/empresas", empresasRoutes);

export default router;