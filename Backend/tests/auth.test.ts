import supertest from "supertest";
import { getRepository, Repository } from "typeorm";
import app from "../src/app/app.server";
import { Empresa } from "../src/app/models/empresa.model";
import { Postulante } from "../src/app/models/postulante.model";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { admin, empresa, invalidConfirmarEmpresa, invalidIniciarSesion, invalidRegistrar, invalidSolicitudEmpresa, postulante, solicitudEmpresa } from "./helpers/auth.helper";

const api = supertest(app);

beforeAll(async () => {
    await connection.create(testConnection);
});

afterAll(async () => {
    await connection.close();
});

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
        });

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

describe("POST registrar empresa", () => {

    let token = "";

    describe("valid request", () => {

        test("return 200 and token for confirmation", async () => {
            const res = await api.post("/api/auth/solicitarEmpresa")
                .send(solicitudEmpresa)
                .expect(200);

            expect(res.body.token).toBeDefined();
            expect(res.body.token).toEqual(expect.any(String));

            await api.post("/api/auth/confirmarSolicitud")
                .send(Object.assign({ token: res.body.token }, empresa))
                .expect(200);
        });

    });

    describe("invalid request", () => {

        test("return 400", async () => {
            for await (const body of invalidSolicitudEmpresa) {
                await api.post("/api/auth/solicitarEmpresa")
                    .send(body)
                    .expect(400);
            }

            const res = await api.post("/api/auth/solicitarEmpresa")
                .send(solicitudEmpresa)
                .expect(200);

            token = res.body.token;

            for await (const body of invalidConfirmarEmpresa(token)) {
                await api.post("/api/auth/confirmarSolicitud")
                    .send(body)
                    .expect(400);
            }

        });

    });

});