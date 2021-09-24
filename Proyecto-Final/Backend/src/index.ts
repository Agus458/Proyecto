import app from "./app/app.server";

/* ---------------------------------------< APP DEPLOY >--------------------------------------- */

const port = app.get("port");

// Inicia la aplicacion en el puerto espcificado en app.config
app.listen(port, () => {
    console.log("Aplicacion escuchando en el puerto:", port);
});