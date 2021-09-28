import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import routes from "./app.routes";
import { notFound } from "../config/notFound.config";
import { connect } from "../config/connection.config";
import filesRoutes from "./routes/files.routes";

/* ---------------------------------------< APP CONFIGURATION >--------------------------------------- */

// Permite que el servidor pueda leer archivos .env.
dotenv.config();

const app = express();

// Se almacena le valor del puerto a utilizar.
app.set("port", process.env.PORT || 3000);

// Connexion a la base de datos.
connect();

/* ------------------------------------------< MIDDLEWARES >------------------------------------------ */

// Permite que la aplicación se comunique con otros servidores.
app.use(cors());

// Provee un logger de peticiones.
app.use(morgan("dev"));

// Permite que la aplicación entienda el formato json.
app.use(express.json());

/* ---------------------------------------------< ROUTES >--------------------------------------------- */

// Rutas de la aplicacion.
app.use("/api", routes);

app.use("/uploads", filesRoutes);

// Ruta por defecto cuando la uri no coincide con ninguna de las expuestas.
app.use(notFound);

export default app;

export const baseDir = __dirname;