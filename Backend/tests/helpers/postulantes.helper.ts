export class PostulantesHelper {

    static tokenPostulante: string;

    static tokenAdmin: string;

    static tokenEmpresa: string;

    static last: number;

    static perfil = {
        tipoDocumento: 0,
        documento: "50072560",
        primerNombre: "Agustin",
        segundoNombre: "Nicolas",
        segundoApellido: "Schlueb",
        primerApellido: "Peraza",
        sexo: "Masculino",
        fechaNacimiento: "2000-09-04",
        nivelEducativo: 7,
        estadoNivelEducativo: 1,
        primerTelefono: "099727357",
        segundoTelefono: "1234654654",
        recivirEmails: true,
        aceptaTerminos: true,
        perfilPublico: false,
        domicilio: {
            pais: 1,
            departamento: 2,
            localidad: 2,
            direccion: "Rapetti"
        },
        capacitaciones: [
            {
                nombreCurso: "BootCamp",
                institucion: "UTEC",
                areaTematica: 1,
                anioInicio: 2021,
                duracion: 10,
                tipoDuracion: "Semanas",
                estadoCurso: 1
            }
        ]
    }

    static invalidPerfilRequests = [
        {
            primerNombre: 1243,
        },
        {
            fechaNacimiento: "",
        },
        {
            fechaNacimiento: 1243,
        },
        {
            fechaNacimiento: "2022-09-04",
        },
        {
            primerApellido: 1243,
        },
        {
            nivelEducativo: 1243,
        },
        {
            nivelEducativo: {},
        },
        {
            estadoNivelEducativo: 1243,
        },
        {
            estadoNivelEducativo: [],
        },
        {
            domicilio: 1243,
        },
    ]

}