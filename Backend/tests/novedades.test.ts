import supertest from "supertest";
import { getRepository } from "typeorm";
import app from "../src/app/app.server";
import { Novedad } from "../src/app/models/novedad.model";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { NovedadesHelper } from "./helpers/novedades.helper";

beforeAll(async () => {
    await connection.create(testConnection);
    const repository = getRepository(Novedad);

    for await (const novedad of NovedadesHelper.novedades) {
        await repository.save(novedad);
    }
});

afterAll(async () => {
    await connection.close();
});

beforeEach(async () => {
    const repository = getRepository(Novedad);
    await repository.clear();

    for await (const novedad of NovedadesHelper.novedades) {
        await repository.save(novedad);
    }
})

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
            expect(result.body.novedades).toHaveLength(NovedadesHelper.novedades.length);
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

    describe("POST", () => {

        describe("valid request", () => {

            test("return 200", async () => {
                await supertest(app)
                    .post("/api/novedades")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(200);


                await supertest(app)
                    .get("/api/novedades")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(400)
            });
        });
    });

    describe("PUT novedad", () => {

        describe("valid request", () => {

            test("return no content", async () => {
                await supertest(app)
                    .put("/api/novedades/1")
                    .send(NovedadesHelper.novedades[3])
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(204);
            });
        });

        describe("invalid valid requests", () => {

            test("return 403 without authorization", async () => {
                await supertest(app)
                    .put("/api/novedades")
                    .expect(403)
                    .expect("Content-Type", /application\/json/)
            });
        });
    });

    describe("DELETE capacitacion", () => {

        describe("valid request", () => {
    
            test("return 200", async () => {
                await supertest(app)
                    .delete("/api/novedades/1")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(200);
    
                const res = await supertest(app)
                    .get("/api/postulantes/perfil")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(200)
                    .expect("Content-Type", /application\/json/);
    
                expect(res.body.capacitaciones).toBeDefined();
                expect(res.body.capacitaciones).toBeInstanceOf(Array);
            });
    
        });
    
        describe("invalid valid requests", () => {
    
            test("return 403 without authorization", async () => {
                await supertest(app)
                    .delete("/api/novedades")
                    .expect(403);
            });
    
            test("return 400 novedad id invalido", async () => {
                await supertest(app)
                    .delete("/api/novedades/asdadg")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(400);
            });
    
            test("return 400 novedad inexistente", async () => {
                await supertest(app)
                    .delete("/api/novedades/50")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(400);
            });
        });
    });

    describe.skip("PUT imagen", () => {

        describe("valid request", () => {
    
            test("return no content", async () => {
                await supertest(app)
                    .put("/api/novedades/imagen")
                    .attach("imagen", path.join(baseDir + "/../../tests/helpers/files/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg"))
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(201);
            });
    
            test("return the novedad with the image", async () => {
                const result = await supertest(app)
                    .get("/api/novedades")
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
                    .put("/api/novedades/imagen")
                    .set('Authorization', `Bearer ${NovedadesHelper.tokenAdmin}`)
                    .expect(403);
            });
    
        });
    
    });

});