import { Router } from "express";
import { esEmpresa } from "../middlewares/esEmpresa";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = Router();

//router.put("/", [isLoggedIn esEmpresa], handleRequest(putEmpresa));

export default router;