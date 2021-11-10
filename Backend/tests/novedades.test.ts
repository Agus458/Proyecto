import supertest from "supertest";
import app from "../src/app/app.server";
import { Novedad } from "../src/app/models/novedad.model";

describe("Novedades", () => {

    describe("GET all", () => {

        test("should return 200 status code", async () => {
            const result = await supertest(await app).get("/api/novedades");

            expect(result.statusCode).toBe(200);
        });

    });

});