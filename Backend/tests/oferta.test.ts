import supertest from "supertest";
import app from "../src/app/app.server";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { admin, empresa, postulante, solicitudEmpresa } from "./helpers/auth.helper";
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

    const res = await api.post("/api/auth/solicitarEmpresa")
        .send(solicitudEmpresa)
        .expect(200);

    expect(res.body.token).toBeDefined();
    expect(res.body.token).toEqual(expect.any(String));

    await api.post("/api/auth/confirmarSolicitud")
        .send(Object.assign({ token: res.body.token }, empresa))
        .expect(200);

    await api.put("/api/administradores/habilitarEmpresa/1")
        .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
        .send({ fechaVencimiento: "2021-12-01" })
        .expect(204)

    result = await api.post("/api/auth/iniciarSesion").send({ email: empresa.email, contrasenia: empresa.contrasenia })
        .expect(200)
        .expect("Content-Type", /application\/json/);

    OfertasHelper.tokenEmpresa = result.body.token;
});

afterAll(async () => {
    await connection.close();
});

describe("POST oferta", () => {

    describe("valid request", () => {

        test("return 201", async () => {
            await api.post("/api/ofertas")
                .send(OfertasHelper.oferta)
                .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
                .expect(201);

            const res = await api.get("/api/ofertas")
                .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data).toBeDefined();
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data).toHaveLength(1);
            expect(res.body.cantidad).toBeDefined();
            expect(res.body.cantidad).toBe(1);
        });

        test("return 201 with admin", async () => {
            await api.post("/api/ofertas")
                .send(Object.assign({ empresa: 1 }, OfertasHelper.oferta))
                .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
                .expect(201);

            const res = await api.get("/api/ofertas")
                .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data).toBeDefined();
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data).toHaveLength(2);
            expect(res.body.cantidad).toBeDefined();
            expect(res.body.cantidad).toBe(2);
        });

    });

    describe("invalid request", () => {

        test("return 403", async () => {
            await api.post("/api/ofertas")
                .send(OfertasHelper.oferta)
                .expect(403);
        });

        test("return 400 admin whihout empresa", async () => {
            await api.post("/api/ofertas")
                .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
                .send(OfertasHelper.oferta)
                .expect(400);
        });

        test("return 400", async () => {
            for await (const body of OfertasHelper.invalidOfertas) {
                await api.post("/api/ofertas")
                    .send(body)
                    .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
                    .expect(400);
            }
        });

    });

});

describe("GET all", () => {

    test("return json", async () => {
        await supertest(app)
            .get("/api/ofertas/all")
            .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)
    });

    test("return an array with two Oferts", async () => {
        const result = await supertest(app)
            .get("/api/ofertas/all")
            .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(result.body).toBeInstanceOf(Object);
        expect(result.body.data).toBeDefined();
        expect(result.body.data).toBeInstanceOf(Array);
        expect(result.body.data).toHaveLength(2);
        expect(result.body.cantidad).toBeDefined();
        expect(result.body.cantidad).toEqual(2);
    });

    test("return 403", async () => {
        await supertest(app)
            .get("/api/ofertas/all")
            .expect(403)
    });

});

describe("GET by id", () => {

    test("return json", async () => {
        await supertest(app)
            .get("/api/ofertas/1")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    });

    test("return an array with two Oferts", async () => {
        const result = await supertest(app)
            .get("/api/ofertas/1")
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(result.body).toBeInstanceOf(Object);
    });

    test("return 400", async () => {
        const result = await supertest(app)
            .get("/api/ofertas/1321")
            .expect(400)
            .expect("Content-Type", /application\/json/)
    });

    test("return 400", async () => {
        const result = await supertest(app)
            .get("/api/ofertas/asd")
            .expect(400)
            .expect("Content-Type", /application\/json/)
    });

});

describe("GET empresa", () => {

    test("return json", async () => {
        await supertest(app)
            .get("/api/ofertas/empresa")
            .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)
    });

    test("return an array with two Oferts of the bussines", async () => {
        const result = await supertest(app)
            .get("/api/ofertas/empresa")
            .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(result.body).toBeInstanceOf(Object);
        expect(result.body.data).toBeDefined();
        expect(result.body.data).toBeInstanceOf(Array);
        expect(result.body.data).toHaveLength(2);
        expect(result.body.cantidad).toBeDefined();
        expect(result.body.cantidad).toEqual(2);
    });

    test("return 403", async () => {
        await supertest(app)
            .get("/api/ofertas/empresa")
            .expect(403)
    });

});

describe("GET empresa/:id", () => {

    test("return json", async () => {
        await supertest(app)
            .get("/api/ofertas/empresa/1")
            .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)
    });

    test("return an array with two Oferts of the bussines with the specified id", async () => {
        const result = await supertest(app)
            .get("/api/ofertas/empresa/1")
            .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(result.body).toBeInstanceOf(Object);
        expect(result.body.data).toBeDefined();
        expect(result.body.data).toBeInstanceOf(Array);
        expect(result.body.data).toHaveLength(2);
        expect(result.body.cantidad).toBeDefined();
        expect(result.body.cantidad).toEqual(2);
    });

    test("return 403", async () => {
        await supertest(app)
            .get("/api/ofertas/empresa/1")
            .expect(403)
    });

});