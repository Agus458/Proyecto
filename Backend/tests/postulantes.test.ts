import path from "path";
import supertest from "supertest";
import { getRepository } from "typeorm";
import app, { baseDir } from "../src/app/app.server";
import { Postulante } from "../src/app/models/postulante.model";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { admin, postulante } from "./helpers/auth.helper";
import { PostulantesHelper } from "./helpers/postulantes.helper";

const api = supertest(app);

beforeAll(async () => {
    await connection.create(testConnection);

    let result = await api.post("/api/auth/registrarse").send(postulante)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    PostulantesHelper.tokenPostulante = result.body.token;

    result = await api.post("/api/auth/iniciarSesion").send(admin)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    PostulantesHelper.tokenAdmin = result.body.token;

    const last = await getRepository(Postulante).findOne();
    if (last) PostulantesHelper.last = last.id;
});

afterAll(async () => {
    await connection.close();
});

describe("GET perfil", () => {

    describe("valid request", () => {

        test("return json", async () => {
            await supertest(app)
                .get("/api/postulantes/perfil")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(200)
                .expect("Content-Type", /application\/json/)
        });

        test("return the profile of the postulante", async () => {
            const result = await supertest(app)
                .get("/api/postulantes/perfil")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body).toBeInstanceOf(Object);
        });

    });

    describe("invalid valid requests", () => {

        test("return 403 without authorization", async () => {
            await supertest(app)
                .get("/api/postulantes/perfil")
                .expect(403)
                .expect("Content-Type", /application\/json/)
        });

    });

});

describe("GET perfil by Id", () => {

    describe("valid request", () => {

        test("return the profile of the postulante with Admin", async () => {
            const result = await supertest(app)
                .get(`/api/postulantes/perfil/${PostulantesHelper.last}`)
                .set('Authorization', `Bearer ${PostulantesHelper.tokenAdmin}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body).toBeInstanceOf(Object);
        });

    });

    describe("invalid valid requests", () => {

        test("return 403 without authorization", async () => {
            await supertest(app)
                .get(`/api/postulantes/perfil/${PostulantesHelper.last}`)
                .expect(403)
                .expect("Content-Type", /application\/json/)
        });

    });

});

describe("PUT perfil", () => {

    describe("valid request", () => {

        test("return no content", async () => {
            await supertest(app)
                .put("/api/postulantes/perfil")
                .send(PostulantesHelper.perfil)
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(204);
        });

        test("return the profile of the postulante", async () => {
            const result = await supertest(app)
                .get("/api/postulantes/perfil")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body).toBeInstanceOf(Object);
            // revisar objeto
        });

    });

    describe("invalid valid requests", () => {

        test("return 403 without authorization", async () => {
            await supertest(app)
                .put("/api/postulantes/perfil")
                .expect(403)
                .expect("Content-Type", /application\/json/)
        });

        test("return 400", async () => {
            for await (const body of PostulantesHelper.invalidPerfilRequests) {
                await supertest(app)
                    .put("/api/postulantes/perfil")
                    .send(body)
                    .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                    .expect(400);
            }
        });

    });

});

describe("PUT imagen", () => {

    describe("valid request", () => {

        test("return no content", async () => {
            await supertest(app)
                .put("/api/postulantes/perfil/imagen")
                .attach("imagen", path.join(baseDir + "/../../tests/helpers/files/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg"))
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(201);
        });

        test("return the profile of the postulante with the image", async () => {
            const result = await supertest(app)
                .get("/api/postulantes/perfil")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body).toBeInstanceOf(Object);
            expect(result.body.imagen).toBeDefined();
            expect(result.body.imagen).toContain("uploads/perfil/imagenes")
        });

    });

    describe("invalid valid requests", () => {

        test("return 403 without authorization", async () => {
            await supertest(app)
                .put("/api/postulantes/perfil/imagen")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenAdmin}`)
                .expect(403);
        });

    });

});

describe("PUT cv", () => {

    describe("valid request", () => {

        test("return no content", async () => {
            await supertest(app)
                .put("/api/postulantes/perfil/cv")
                .attach("cv", path.join(baseDir + "/../../tests/helpers/files/8d776ded-b670-476d-bf02-6f4c3b5cb0f2.pdf"))
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(201);
        });

        test("return the profile of the postulante with the image", async () => {
            const result = await supertest(app)
                .get("/api/postulantes/perfil")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body).toBeInstanceOf(Object);
            expect(result.body.cv).toBeDefined();
            expect(result.body.cv).toContain("uploads/perfil/documentos")
        });

    });

    describe("invalid valid requests", () => {

        test("return 403 without authorization", async () => {
            await supertest(app)
                .put("/api/postulantes/perfil/cv")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenAdmin}`)
                .expect(403);
        });

    });

});

describe("GET validarPerfil", () => {

    describe("valid request", () => {

        beforeAll(async () => {
            await supertest(app)
                .put("/api/postulantes/perfil")
                .send(PostulantesHelper.perfil)
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(204);
        });

        test("return 200", async () => {
            await supertest(app)
                .get("/api/postulantes/validarPerfil")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(200);
        });

    });

    describe("invalid request", () => {

        beforeAll(async () => {
            await PostulantesHelper.clear();

            let result = await api.post("/api/auth/registrarse").send(postulante)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            PostulantesHelper.tokenPostulante = result.body.token;

            await supertest(app)
                .put("/api/postulantes/perfil")
                .send(PostulantesHelper.perfilIncompleto)
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(204);
        });

        test("return 400", async () => {
            await supertest(app)
                .get("/api/postulantes/validarPerfil")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenPostulante}`)
                .expect(400);
        });

        test("return 403 with admin", async () => {
            await supertest(app)
                .get("/api/postulantes/validarPerfil")
                .set('Authorization', `Bearer ${PostulantesHelper.tokenAdmin}`)
                .expect(403);
        });

    });

});