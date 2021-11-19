import supertest from "supertest";
import app from "../src/app/app.server";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { admin, postulante } from "./helpers/auth.helper";
import { OfertasHelper } from "./helpers/ofertas.helper";

const api = supertest(app);

beforeAll(async () => {
    await connection.create(testConnection);

    let result = await api.post("/api/auth/registrarse").send(postulante)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    OfertasHelper.tokenPostulante = result.body.token;

    result = await api.post("/api/auth/iniciarSesion").send(admin)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    OfertasHelper.tokenAdmin = result.body.token;
});

afterAll(async () => {
    await connection.close();
});