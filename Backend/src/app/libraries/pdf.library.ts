import moment from "moment";
import { Postulante } from "../models/postulante.model";

export const profileTemplatePDF = async (host: string, data: Postulante, token: string): Promise<string> => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap" rel="stylesheet">
        <style>
            html,
            body {
                height: 100%;
                margin: 0;
            }
    
            body {
                font-family: 'Raleway', sans-serif;
                font-style: normal;
                padding: 30px;
            }
    
            hr {
                margin-top: 1rem;
                margin-bottom: 1rem;
                border: 0;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
            }
    
            .content {
                padding: 30px;
            }
    
            .imagen {
                width: 100%;
                height: 250px;
                object-fit: cover;
                object-position: center;
            }
    
            .header {
                background-color: rgb(27, 27, 27);
                color: white;
            }
    
            h2 {
                color: rgb(0, 165, 0);
                font-weight: 700;
            }
    
            h5 {
                font-weight: 900;
                font-style: italic;
            }
    
            strong {
                font-weight: 900;
            }
        </style>
    </head>
    
    <body>
    
        <div class="container p-5">
            <div class="card mb-5 header">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.imagen ? await getImagen(host, data.imagen, token) : ""}" class="img-fluid rounded imagen" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body content">
                            <h1 class="card-title">${data.primerNombre + " " + data.primerApellido}</h1>
                            <p class="card-text">${data.email}</p>
                            <p class="card-text"><small class="text-muted"> PDF generado el ${moment().format("DD-MM-YYYY")}</small></p>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title">Datos Personales</h2>
                    <hr>
                    <div class="row">
                        <div class="col-12 mb-2"><strong>Tipo Documento:</strong> ${data.tipoDocumento ? data.tipoDocumento : "-"}</div>
                        <div class="col-12 mb-2"><strong>Documento:</strong> ${data.documento ? data.documento : "-"}</div>
                        <div class="col-12 mb-2"><strong>Segundo Nombre:</strong> ${data.segundoNombre ? data.segundoNombre : "-"}</div>
                        <div class="col-12 mb-2"><strong>Segundo Apellido:</strong> ${data.segundoApellido ? data.segundoApellido : "-"}</div>
                        <div class="col-12 mb-2"><strong>Fecha de Nacimiento:</strong> ${data.fechaNacimiento ? data.fechaNacimiento : "-"}</div>
                        <div class="col-12 mb-2"><strong>Sexo:</strong> ${data.sexo ? data.sexo : "-"}</div>
                    </div>
                    <br>
                    <h5 class="card-title">Domicilio</h5>
                    <hr>
                    <div class="row">
                        ${data.domicilio ? `
                            <div class="col-12 mb-2"><strong>Pais:</strong> ${data.domicilio.pais && data.domicilio.pais.nombre ? data.domicilio.pais.nombre : "-"}</div>
                            <div class="col-12 mb-2"><strong>Departamento:</strong> ${data.domicilio.departamento && data.domicilio.departamento.nombre ? data.domicilio.departamento.nombre : "-"}</div>
                            <div class="col-12 mb-2"><strong>Localidad:</strong> ${data.domicilio.localidad && data.domicilio.localidad.nombre ? data.domicilio.localidad.nombre : "-"}</div>
                            <div class="col-12 mb-2"><strong>Barrio:</strong> ${data.domicilio.barrio ? data.domicilio.barrio : "-"}</div>
                            <div class="col-12 mb-2"><strong>Direccion:</strong> ${data.domicilio.direccion ? data.domicilio.direccion : "-"}</div>
                            ` : "No especificado"
        }
                    </div>
                    <br>
                    <h5 class="card-title">Contacto</h5>
                    <hr>
                    <div class="row">
                        <div class="col-12 mb-2"><strong>Telefono:</strong> ${data.primerTelefono ? data.primerTelefono : "-"}</div>
                        <div class="col-12 mb-2"><strong>Telefono2:</strong> ${data.segundoTelefono ? data.segundoTelefono : "-"}</div>
                    </div>
                </div>
            </div>
    
            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title">Educacion y Formacion</h2>
                    <hr>
                    <div class="row">
                        <div class="col-12 mb-2"><strong>Nivel Educativo:</strong> ${data.nivelEducativo ? data.nivelEducativo.nombre : "-"}</div>
                        <div class="col-12 mb-2"><strong>Estado:</strong> ${data.estadoNivelEducativo ? data.estadoNivelEducativo.nombre : "-"}</div>
                        <div class="col-12 mb-2"><strong>Orientacion:</strong> ${data.orientacion ? data.orientacion : "-"}</div>
                    </div>
                    <br>
                    <h5 class="card-title">Capacitaciones</h5>
                    <hr>
                    <ul class="list-group">
                        ${data.capacitaciones ?
                            data.capacitaciones.map(capacitacion => {
                                return `
                                    <li class="list-group-item">
                                        <div class="content">
                                            <h5 class="card-title">${capacitacion.nombreCurso}</h5>
                                            <hr>
                                            <div class="mb-2"><strong>Área temática:</strong> ${capacitacion.areaTematica ? capacitacion.areaTematica.nombre : "-"}</div>
                                            <div class="mb-2"><strong>Institución Educativa:</strong> ${capacitacion.institucion ? capacitacion.institucion : "-"}</div>
                                            <div class="mb-2"><strong>Año de inicio:</strong> ${capacitacion.anioInicio ? capacitacion.anioInicio : "-"}</div>
                                            <div class="mb-2"><strong>Duración:</strong> ${capacitacion.duracion ? capacitacion.duracion : "-"}</div>
                                            <div class="mb-2"><strong>Estado del curso:</strong> ${capacitacion.estadoCurso ? capacitacion.estadoCurso.nombre : "-"}</div>
                                        </div>
                                    </li>
                                `;
                            })
                        : `
                            <li class="list-group-item">
                                <div class="content">
                                    No Tiene
                                </div>
                            </li>
                        `}
                    </ul>
                    <br>
                    <h5 class="card-title">Conocimientos Informaticos</h5>
                    <hr>
                    <ul class="list-group">
                        ${data.conocimientosInformaticos ?
                            data.conocimientosInformaticos.map(conocimiento => {
                                return `
                                    <li class="list-group-item">
                                        <div class="content">
                                            <h5 class="card-title">${conocimiento.nombreAplicacion}</h5>
                                            <hr>
                                            <div class="mb-2"><strong>Categoria:</strong> ${conocimiento.categoria ? conocimiento.categoria.nombre : "-"}</div>
                                            <div class="mb-2"><strong>Nivel Conocimiento:</strong> ${conocimiento.nivelConocimiento ? conocimiento.nivelConocimiento : "-"}</div>
                                        </div>
                                    </li>
                                `;
                            })
                        : `
                            <li class="list-group-item">
                                <div class="content">
                                    No Tiene
                                </div>
                            </li>
                        `}
                    </ul>
                    <br>
                    <h5 class="card-title">Idiomas</h5>
                    <hr>
                    <ul class="list-group">
                        ${data.idiomas ?
                            data.idiomas.map(idioma => {
                                return `
                                    <li class="list-group-item">
                                        <div class="content">
                                            <h5 class="card-title">${idioma.nombreIdioma ? idioma.nombreIdioma.nombre : "-"}</h5>
                                            <hr>
                                            <div class="mb-2"><strong>Especificacion:</strong> ${idioma.especificacion ? idioma.especificacion : "-"}</div>
                                            <div class="mb-2"><strong>Habla:</strong> ${idioma.habla ? idioma.habla : "-"}</div>
                                            <div class="mb-2"><strong>Comprension Auditiva:</strong> ${idioma.comprensionAuditiva ? idioma.comprensionAuditiva : "-"}</div>
                                            <div class="mb-2"><strong>Comprension Lectora:</strong> ${idioma.comprensionLectora ? idioma.comprensionLectora : "-"}</div>
                                            <div class="mb-2"><strong>Escritura:</strong> ${idioma.escritura ? idioma.escritura : "-"}</div>
                                        </div>
                                    </li>
                                `;
                            })
                        : `
                            <li class="list-group-item">
                                <div class="content">
                                    No Tiene
                                </div>
                            </li>
                        `}
                    </ul>
                </div>
            </div>
    
            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title">Expreiencias Laborales</h2>
                    <hr>
                    <ul class="list-group">
                        ${data.experienciasLaborales ?
                            data.experienciasLaborales.map(experiencia => {
                                return `
                                    <li class="list-group-item">
                                        <div class="content">
                                            <h5 class="card-title">${experiencia.nombreEmpresa}</h5>
                                            <hr>
                                            <div class="mb-2"><strong>Cargo:</strong> ${experiencia.cargo ? experiencia.cargo : "-"}</div>
                                            <div class="mb-2"><strong>Rubro:</strong> ${experiencia.rubro ? experiencia.rubro.nombre : "-"}</div>
                                            <div class="mb-2"><strong>Nivel Jerarquico:</strong> ${experiencia.nivelJerarquico ? experiencia.nivelJerarquico.nombre : "-"}</div>
                                            <div class="mb-2"><strong>Tareas Realizadas:</strong> ${experiencia.tareasRealizadas ? experiencia.tareasRealizadas : "-"}</div>
                                            <div class="mb-2"><strong>Fecha Inicio:</strong> ${experiencia.fechaInicio ? experiencia.fechaInicio : "-"}</div>
                                            <div class="mb-2"><strong>Tarbajando:</strong> ${experiencia.trabajando ? "SI" : "NO"}</div>
                                            <div class="mb-2"><strong>Fecha Fin:</strong> ${experiencia.fechaFin ? experiencia.fechaFin : "-"}</div>
                                            <br>
                                            <strong>Referencia</strong>
                                            <hr>
                                            <div class="mb-2"><strong>Nombre:</strong> ${experiencia.nombreReferencia ? experiencia.nombreReferencia : "-"}</div>
                                            <div class="mb-2"><strong>Apellido:</strong> ${experiencia.apellidoReferencia ? experiencia.apellidoReferencia : "-"}</div>
                                            <div class="mb-2"><strong>Cargo:</strong> ${experiencia.cargoReferencia ? experiencia.cargoReferencia : "-"}</div>
                                            <div class="mb-2"><strong>Email:</strong> ${experiencia.emailReferencia ? experiencia.emailReferencia : "-"}</div>
                                            <div class="mb-2"><strong>Telefono:</strong> ${experiencia.telefonoReferencia ? experiencia.telefonoReferencia : "-"}</div>
                                        </div>
                                    </li>
                                `;
                            })
                        : `
                            <li class="list-group-item">
                                <div class="content">
                                    No Tiene
                                </div>
                            </li>
                        `}
                    </ul>
                </div>
            </div>
    
            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title">Permisos y Licencias</h2>
                    <hr>
                    <ul class="list-group">
                        ${data.permisos ?
                            data.permisos.map(permiso => {
                                return `
                                    <li class="list-group-item">
                                        <div class="content">
                                            <h5 class="card-title">${permiso.tipoDocumento ? permiso.tipoDocumento.nombre : "-"}</h5>
                                            <hr>
                                            <div class="mb-2"><strong>Vencimiento:</strong> ${permiso.vigencia ? permiso.vigencia : "-"}</div>
                                            <div class="mb-2"><strong>Especificacion:</strong> ${permiso.especificacion ? permiso.especificacion : "-"}</div>
                                        </div>
                                    </li>
                                `;
                            })
                        : `
                            <li class="list-group-item">
                                <div class="content">
                                    No Tiene
                                </div>
                            </li>
                        `}
                    </ul>
                </div>
            </div>
    
            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title">Intereses y preferencias</h2>
                    <hr>
                    <div class="mb-2"><strong>Jornada Laboral:</strong> ${`${data.jornadaCompleta ? "Completa" : ""} ${data.jornadaIndiferente ? "Indiferente" : ""} ${data.jornadaManiana ? "Mañana" : ""} ${data.jornadaNoche ? "Noche" : ""} ${data.jornadaTarde ? "Tarde" : ""}`}</div>
                    <br>
                    <h5 class="card-title">Preferencias Laborales</h5>
                    <hr>
                    <ul class="list-group">
                        ${data.preferenciasLaborales ?
                            data.preferenciasLaborales.map(preferencia => {
                                return `
                                    <li class="list-group-item">
                                        <div class="content">
                                            <h5 class="card-title">${preferencia.puestoPreferido ? preferencia.puestoPreferido : "-"}</h5>
                                            <hr>
                                            <div class="mb-2"><strong>Area de Interes:</strong> ${preferencia.areasInteres ? preferencia.areasInteres.nombre : "-"}</div>
                                            <div class="mb-2"><strong>Aspiracion Salarial:</strong> ${preferencia.aspiracionSalarial ? preferencia.aspiracionSalarial : "-"}</div>
                                        </div>
                                    </li>
                                `;
                            })
                        : `
                            <li class="list-group-item">
                                <div class="content">
                                    No Tiene
                                </div>
                            </li>
                        `}
                    </ul>
                </div>
            </div>
    
        </div>
    
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
            integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.min.js"
            integrity="sha384-PsUw7Xwds7x08Ew3exXhqzbhuEYmA2xnwc8BuD6SEr+UmEHlX8/MCltYEodzWA4u"
            crossorigin="anonymous"></script>
    </body>
    
    </html>
    `;
}

export const getImagen = async (host: string, url: string, token: string): Promise<any> => {
    try {
        const result = await fetch(host + "/" + url, {
            headers: { "Authorization": "Bearer " + token }
        });

        var base64String;
        let blob = await result.blob();
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
           base64String = reader.result;
        }
    
        return base64String;
    } catch (error) {
    }

    return "";
}