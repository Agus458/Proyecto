import supertest from "supertest";
import { getRepository } from "typeorm";
import app from "../src/app/app.server";
import { Novedad } from "../src/app/models/novedad.model";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { novedades } from "./helpers/novedades.helper";

beforeAll(async () => {
    await connection.create(testConnection);
});

afterAll(async () => {
    await connection.close();
});

beforeEach(async () => {
    const repository = getRepository(Novedad);
    await repository.clear();

    for await (const novedad of novedades) {
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
            expect(result.body.novedades).toHaveLength(novedades.length);
            expect(result.body.cantidad).toBeDefined();
            expect(result.body.cantidad).toEqual(expect.any(Number));

            novedades.forEach(novedad => {
                expect(result.body.novedades).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({ titulo: novedad.titulo })
                    ])
                )
            });

        });

    });

});