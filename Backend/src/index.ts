import app from "./app/app.server";

/* ---------------------------------------< APP DEPLOY >--------------------------------------- */

app.then((server) => {
    const port = server.get("port");

    // Inicia la aplicacion en el puerto espcificado en app.config
    server.listen(port, () => {
        console.log("Aplicacion escuchando en el puerto:", port);
    });
})