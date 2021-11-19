export class OfertasHelper {

    public static tokenPostulante = "";
    public static tokenAdmin = "";
    public static tokenEmpresa = "";

    public static oferta = {
        nombreOfferta: "Oferta",
        puesto: "Desarrollador",
        rangoSalario: "3000",
        requisitosExcluyente: "Ut imperdiet vitae eros et interdum. Duis justo enim, lacinia in odio nec, congue varius lorem. Integer quis varius tellus. Integer sed aliquet nisi.",
        requisitosValorados: "Ut imperdiet vitae eros et interdum. Duis justo enim, lacinia in odio nec, congue varius lorem. Integer quis varius tellus. Integer sed aliquet nisi.",
        telefonoContacto: "1321654",
        vacantes: "20",
        descripcion: "Ut imperdiet vitae eros et interdum. Duis justo enim, lacinia in odio nec, congue varius lorem. Integer quis varius tellus. Integer sed aliquet nisi.",
        areaDeTrabajo: 1,
        emailContacto: "mail@mail.com",
        fechaCierre: "2021-12-01",
        funcionesDePuesto: "Ut imperdiet vitae eros et interdum. Duis justo enim, lacinia in odio nec, congue varius lorem. Integer quis varius tellus. Integer sed aliquet nisi.",
        lugarTrabajo: "Oficina",
        horariodetrabajo: "18:00 a 20:00"
    }

    public static invalidOfertas = [
        {},
        { nombreOfferta: 231 },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: {} },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: true },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: "dsadsa" },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: 321 },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: true },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: 132312 },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: "asd" },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: 12 },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: [] },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: true },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: {} },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: 3231 },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: this.oferta.horariodetrabajo, areaDeTrabajo: true },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: this.oferta.horariodetrabajo, areaDeTrabajo: 1412 },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: this.oferta.horariodetrabajo, areaDeTrabajo: this.oferta.areaDeTrabajo, emailContacto: "sdsadas" },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: this.oferta.horariodetrabajo, areaDeTrabajo: this.oferta.areaDeTrabajo, emailContacto: 1231 },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: this.oferta.horariodetrabajo, areaDeTrabajo: this.oferta.areaDeTrabajo, emailContacto: this.oferta.emailContacto, fechaCierre: 123 },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: this.oferta.horariodetrabajo, areaDeTrabajo: this.oferta.areaDeTrabajo, emailContacto: this.oferta.emailContacto, fechaCierre: "sdasds" },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: this.oferta.horariodetrabajo, areaDeTrabajo: this.oferta.areaDeTrabajo, emailContacto: this.oferta.emailContacto, fechaCierre: "2020-09-04" },
        { nombreOfferta: this.oferta.nombreOfferta, puesto: this.oferta.puesto, rangoSalario: this.oferta.rangoSalario, requisitosExcluyente: this.oferta.requisitosExcluyente, requisitosValorados: this.oferta.requisitosValorados, telefonoContacto: this.oferta.telefonoContacto, vacantes: this.oferta.vacantes, descripcion: this.oferta.descripcion, funcionesDePuesto: this.oferta.funcionesDePuesto, lugarTrabajo: this.oferta.lugarTrabajo, horariodetrabajo: this.oferta.horariodetrabajo, areaDeTrabajo: this.oferta.areaDeTrabajo, emailContacto: this.oferta.emailContacto },
    ]
}