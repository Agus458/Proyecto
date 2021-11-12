import supertest from "supertest";
import { getRepository, Repository } from "typeorm";
import app from "../src/app/app.server";
import { Empresa } from "../src/app/models/empresa.model";
import { Postulante } from "../src/app/models/postulante.model";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { admin, invalidIniciarSesion, invalidRegistrar, postulante } from "./helpers/auth.helper";

const api = supertest(app);

beforeAll(async () => {
    await connection.create(testConnection);
});

afterAll(async () => {
    await connection.close();
});

beforeEach(async () => {
    let repository: any = getRepository(Postulante);
    await repository.delete({});

    repository = getRepository(Empresa);
    await repository.delete({});
})

describe("POST iniciarSesion", () => {

    describe("valid request", () => {

        test("return auth info", async () => {
            const result = await api.post("/api/auth/iniciarSesion").send(admin)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body.usuario).toBeDefined();
            expect(result.body.usuario).toBeInstanceOf(Object);
            expect(result.body.usuario).toEqual(
                expect.objectContaining({ email: admin.email })
            );
            expect(result.body.token).toBeDefined();
            expect(result.body.token).toEqual(expect.any(String));
            expect(result.body.exp).toBeDefined();
        })

    })

    describe("invalid valid requests", () => {

        test("return 400 when invalid", async () => {
            for await (const body of invalidIniciarSesion) {
                const result = await api.post("/api/auth/iniciarSesion").send(body)
                    .expect(400)
                    .expect("Content-Type", /application\/json/);

                expect(result.body.message).toBeDefined();
            }
        })

    })

})

describe("POST registrarse", () => {

    describe("valid request", () => {

        test("return auth info of the created user", async () => {
            const result = await api.post("/api/auth/registrarse").send(postulante)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            expect(result.body.usuario).toBeDefined();
            expect(result.body.usuario).toBeInstanceOf(Object);
            expect(result.body.usuario).toEqual(
                expect.objectContaining({ email: postulante.email })
            );
            expect(result.body.token).toBeDefined();
            expect(result.body.token).toEqual(expect.any(String));
            expect(result.body.exp).toBeDefined();
        })

    })

    describe("invalid valid requests", () => {

        beforeEach(async () => {
            await api.post("/api/auth/registrarse").send(postulante)
                .expect(201)
                .expect("Content-Type", /application\/json/);
        })

        test("return 400 when invalid", async () => {
            for await (const body of invalidRegistrar) {
                const result = await api.post("/api/auth/registrarse").send(body)
                    .expect(400)
                    .expect("Content-Type", /application\/json/);

                expect(result.body.message).toBeDefined();
            }
        })

    })

})

// Falta solicitar empresa y confirmar empresa