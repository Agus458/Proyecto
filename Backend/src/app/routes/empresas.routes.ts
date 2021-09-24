import { Router } from "express";
import { handleRequest } from "../../config/error/handleRequest";
import { esEmpresa } from "../middlewares/esEmpresa";
import { putEmpresa } from "../controllers/empresa.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";


const router = Router();

router.put("/", [isLoggedIn, esEmpresa], handleRequest(putEmpresa));

export default router;