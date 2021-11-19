export const admin = {
    email: "admin@admin.com",
    contrasenia: "admin"
}

export const postulante = {
    email: "user@mail.com",
    contrasenia: "1234"
}

export const postulante2 = {
    email: "user2@mail.com",
    contrasenia: "1234"
}

export const invalidIniciarSesion = [
    {},
    { email: "" },
    { contrasenia: "" },
    { email: "admin@mail.com", contrasenia: "" },
    { email: "admin@admin.com", contrasenia: "1234" },
    { email: 123, contrasenia: true },
    { email: {}, contrasenia: [] },
]

export const solicitudEmpresa = { rut: "1234", contrasenia: "1234" }

export const invalidSolicitudEmpresa = [
    {},
    { rut: 123 },
    { contrasenia: 1234 },
    { rut: "1234", contrasenia: 1234 }
]

export const invalidConfirmarEmpresa = (token: string) => {
    return [
        {},
        { token: 1232 },
        { token: "asd" },
        { token, contrasenia: 123 },
        { token, contrasenia: empresa.contrasenia + "dsa" },
        { token, contrasenia: empresa.contrasenia },
        { token, contrasenia: empresa.contrasenia, email: 231 },
        { token, contrasenia: empresa.contrasenia, email: "231" },
        { token, contrasenia: empresa.contrasenia, email: "admin@admin.com" },
        { token, contrasenia: empresa.contrasenia, email: empresa.email, razonSocial: 231321 },
        { token, contrasenia: empresa.contrasenia, email: empresa.email, razonSocial: "Empresa", telefono: 213 },
        { token, contrasenia: empresa.contrasenia, email: empresa.email, razonSocial: "Empresa", telefono: "13245646", localidad: "sdas" },
        { token, contrasenia: empresa.contrasenia, email: empresa.email, razonSocial: "Empresa", telefono: "13245646", localidad: 1321 },
        { token, contrasenia: empresa.contrasenia, email: empresa.email, razonSocial: "Empresa", telefono: "13245646", localidad: 1, visibilidad: "dsdsa" },
        { token, contrasenia: empresa.contrasenia, email: empresa.email, razonSocial: "Empresa", telefono: "13245646", localidad: 1, visibilidad: true, nombreFantasia: 123 },
    ]
}

export const empresa = {
    rut: "1234",
    contrasenia: "1234",
    email: "empresa@mail.com",
    razonSocial: "Empresa",
    telefono: "13245646",
    localidad: 1,
    visibilidad: true,
    nombreFantasia: "Epresa"
}

export const invalidRegistrar = [
    {},
    { email: "" },
    { contrasenia: "" },
    postulante,
    { email: 123, contrasenia: true },
    { email: {}, contrasenia: [] },
    { email: "sad", contrasenia: "1234" },
]