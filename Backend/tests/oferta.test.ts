import supertest from "supertest";
import app from "../src/app/app.server";
import connection from "../src/config/connection.config";
import { testConnection } from "../src/config/test.connection.config";
import { admin, empresa, postulante, solicitudEmpresa } from "./helpers/auth.helper";
import { OfertasHelper } from "./helpers/ofertas.helper";
import { PostulantesHelper } from "./helpers/postulantes.helper";

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

describe("PUT oferta", () => {

    describe("valid request", () => {

        test("return 201", async () => {
            await api.put("/api/ofertas/1")
                .send(OfertasHelper.oferta)
                .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
                .expect(204);

            const res = await api.get("/api/ofertas")
                .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data).toBeDefined();
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data).toHaveLength(2);
            expect(res.body.cantidad).toBeDefined();
            expect(res.body.cantidad).toBe(2);
        });

        test("return 201 with admin", async () => {
            await api.put("/api/ofertas/1")
                .send(Object.assign({ empresa: 1 }, OfertasHelper.oferta))
                .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
                .expect(204);

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
            await api.put("/api/ofertas/1")
                .send(OfertasHelper.oferta)
                .expect(403);
        });

        test("return 400 admin without empresa", async () => {
            await api.put("/api/ofertas/1")
                .set('Authorization', `Bearer ${OfertasHelper.tokenAdmin}`)
                .send(OfertasHelper.oferta)
                .expect(400);
        });

        test("return 400 invalid id", async () => {
            await api.put("/api/ofertas/sdada")
                .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
                .send(OfertasHelper.oferta)
                .expect(400);
        });

        test("return 400 invalid id", async () => {
            await api.put("/api/ofertas/1222")
                .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
                .send(OfertasHelper.oferta)
                .expect(400);
        });

        test("return 400", async () => {
            for await (const body of OfertasHelper.invalidOfertas) {
                await api.put("/api/ofertas/1")
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

describe("POST inscribirse", () => {

    test("return 400 uncomplete profile", async () => {
        await supertest(app)
            .post("/api/ofertas/inscribirse/1")
            .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
            .expect(400);
    });

    describe("valid profile", () => {

        beforeAll(async () => {
            await supertest(app)
                .put("/api/postulantes/perfil")
                .send(PostulantesHelper.perfil)
                .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
                .expect(204);
        });

        test("return 200 and inscribe to the offer", async () => {
            await supertest(app)
                .get("/api/postulantes/validarPerfil")
                .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
                .expect(200);

            await supertest(app)
                .post("/api/ofertas/inscribirse/1")
                .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
                .expect(204);
        });

    });

    describe("invalid request", () => {

        test("already inscribed", async () => {
            await supertest(app)
                .post("/api/ofertas/inscribirse/1")
                .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
                .expect(400);
        })

        test("invalid id", async () => {
            await supertest(app)
                .post("/api/ofertas/inscribirse/sdadsa")
                .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
                .expect(400);
        })

        // test("invalid id", async () => {
        //     await supertest(app)
        //         .post("/api/ofertas/inscribirse/sdadsa")
        //         .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
        //         .expect(400);
        // })

    });

})

describe("GET postulante", () => {

    test("return json", async () => {
        await supertest(app)
            .get("/api/ofertas/postulante")
            .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)
    });

    test("return an array with two Oferts", async () => {
        const result = await supertest(app)
            .get("/api/ofertas/postulante")
            .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(result.body).toBeInstanceOf(Object);
        expect(result.body.data).toBeDefined();
        expect(result.body.data).toBeInstanceOf(Array);
        expect(result.body.data).toHaveLength(1);
        expect(result.body.cantidad).toBeDefined();
        expect(result.body.cantidad).toEqual(1);
    });

    test("return 403", async () => {
        await supertest(app)
            .get("/api/ofertas/postulante")
            .expect(403)
    });

});

describe("GET postulantes", () => {

    test("return json", async () => {
        await supertest(app)
            .get("/api/ofertas/postulantes/1")
            .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)
    });

    test("return an array with two Oferts", async () => {
        const result = await supertest(app)
            .get("/api/ofertas/postulantes/1")
            .set('Authorization', `Bearer ${OfertasHelper.tokenEmpresa}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(result.body).toBeInstanceOf(Object);
        expect(result.body.data).toBeDefined();
        expect(result.body.data).toBeInstanceOf(Array);
        expect(result.body.data).toHaveLength(1);
        expect(result.body.cantidad).toBeDefined();
        expect(result.body.cantidad).toEqual(1);
    });

    test("return 403", async () => {
        await supertest(app)
            .get("/api/ofertas/postulantes/1")
            .expect(403)
    });

});

describe("GET postulado", () => {

    test("return 200", async () => {
        const res = await supertest(app)
            .get("/api/ofertas/postulado/1")
            .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(res.body.postulado).toBeDefined();
        expect(res.body.postulado).toEqual(true);
    });

    test("return 200 and false", async () => {
        const res = await supertest(app)
            .get("/api/ofertas/postulado/2")
            .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(res.body.postulado).toBeDefined();
        expect(res.body.postulado).toEqual(false);
    });
    
    test("return 400", async () => {
        await supertest(app)
            .get("/api/ofertas/postulado/sdadsa")
            .set('Authorization', `Bearer ${OfertasHelper.tokenPostulante}`)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });

    test("return 403", async () => {
        await supertest(app)
            .get("/api/ofertas/postulado/1")
            .expect(403)
    });

});
