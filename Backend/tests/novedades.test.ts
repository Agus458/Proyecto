import path from "path";
import supertest from "supertest";
import { getRepository } from "typeorm";
import app, { baseDir } from "../src/app/app.server";
import { Novedad } from "../src/app/models/novedad.model";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { admin } from "./helpers/auth.helper";
import { NovedadesHelper } from "./helpers/novedades.helper";

beforeAll(async () => {
    await connection.create(testConnection);
    const repository = getRepository(Novedad);

    for await (const novedad of NovedadesHelper.novedades) {
        await repository.save(novedad);
    }

    const result = await supertest(app).post("/api/auth/iniciarSesion").send(admin)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    NovedadesHelper.tokenAdmin = result.body.token;
});

afterAll(async () => {
    await connection.close();
});

describe("Novedades", () => {

    describe("GET all", () => {

        test("return json", async () => {
            await supertest(app)
                .get("/api/novedades")
                .expect(200)
                .expect("Content-Type", /application\/json/)
        });

        test("return an array with two Novedades", async () => {
            const result = await supertest(app)
                .get("/api/novedades")
                .expect(200)
                .expect("Content-Type", /application\/json/)

            expect(result.body).toBeInstanceOf(Object);
            expect(result.body.novedades).toBeDefined();
            expect(result.body.novedades).toBeInstanceOf(Array);
            expect(result.body.novedades).toHaveLength(2);
            expect(result.body.cantidad).toBeDefined();
            expect(result.body.cantidad).toEqual(expect.any(Number));

            NovedadesHelper.novedades.forEach(novedad => {
                expect(result.body.novedades).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({ titulo: novedad.titulo })
                    ])
                )
            });
        });
    });

    describe("GET by Id", () => {

        describe("valid request", () => {

            test("return the id of the novedad", async () => {
                const result = await supertest(app)
                    .get(`/api/novedades/1`)
                    .expect(200)
                    .expect("Content-Type", /application\/json/);

                expect(result.body).toBeInstanceOf(Object);
            });
        });

        describe("invalid valid requests", () => {

            test("return 400 invalid id", async () => {
                await supertest(app)
                    .get(`/api/novedades/asdgsfrg`)
                    .expect(400)
                    .expect("Content-Type", /application\/json/)
            });
        });
    });

    describe("PUT novedad", () => {

        describe("valid request", () => {

            test("return no content", async () => {
                await supertest(app)
                    .put("/api/novedades/1")
                    .send(NovedadesHelper.novedades[1])
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(200);

                const result = await supertest(app)
                    .get("/api/novedades")
                    .expect(200)
                    .expect("Content-Type", /application\/json/)

                expect(result.body).toBeInstanceOf(Object);
                expect(result.body.novedades).toBeDefined();
                expect(result.body.novedades).toBeInstanceOf(Array);
                expect(result.body.novedades).toHaveLength(2);
                expect(result.body.cantidad).toBeDefined();
                expect(result.body.cantidad).toEqual(expect.any(Number));
            });
        });

        describe("invalid valid requests", () => {

            test("return 403 without authorization", async () => {
                await supertest(app)
                    .put("/api/novedades/1")
                    .expect(403)
                    .expect("Content-Type", /application\/json/)
            });
        });
    });

    describe("DELETE novedad", () => {

        describe("valid request", () => {

            test("return 200", async () => {
                await supertest(app)
                    .delete("/api/novedades/2")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(200);

                const result = await supertest(app)
                    .get("/api/novedades")
                    .expect(200)
                    .expect("Content-Type", /application\/json/)

                expect(result.body).toBeInstanceOf(Object);
                expect(result.body.novedades).toBeDefined();
                expect(result.body.novedades).toBeInstanceOf(Array);
                expect(result.body.novedades).toHaveLength(1);
                expect(result.body.cantidad).toBeDefined();
                expect(result.body.cantidad).toEqual(expect.any(Number));
            });

        });

        describe("invalid valid requests", () => {

            test("return 403 without authorization", async () => {
                await supertest(app)
                    .delete("/api/novedades/1")
                    .expect(403);
            });

        });
    });

    describe("PUT imagen", () => {

        describe("valid request", () => {

            test("return no content", async () => {
                await supertest(app)
                    .put("/api/novedades/imagen/1")
                    .attach("imagen", path.join(baseDir + "/../../tests/helpers/files/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg"))
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(201);
            });

            test("return the novedad with the image", async () => {
                const result = await supertest(app)
                    .get("/api/novedades/1")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(200)
                    .expect("Content-Type", /application\/json/);

                expect(result.body).toBeInstanceOf(Object);
                expect(result.body.imagen).toBeDefined();
                expect(result.body.imagen).toContain("uploads/novedades")
            });

        });

        describe("invalid valid requests", () => {

            test("return 403 without authorization", async () => {
                await supertest(app)
                    .put("/api/novedades/imagen/1")
                    .expect(403);
            });

        });

    });

});