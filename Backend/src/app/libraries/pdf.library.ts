import moment from "moment";

export const profileTemplatePDF = (data: any): string => {
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
                padding: 30px;
            }

            hr {
                margin-top: 1rem;
                margin-bottom: 1rem;
                border: 0;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
            }

            strong {
                font-weight: bolder;
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
        </style>
    </head>

    <body>

        <div class="container p-5">
            <div class="card mb-5 bg-dark text-white">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="C:\\Users\\agusp\\Downloads\\dsadsa.jpg" class="img-fluid rounded imagen" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body content">
                            <h2 class="card-title">${data.primerNombre + " " + data.primerApellido}</h2>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted"> PDF generado el ${moment().format("DD-MM-YYYY")}</small></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title text-success">Datos Personales</h2>
                    <hr>
                    <div class="row">
                        <div class="col-12 mb-2"><strong>Tipo Documento</strong> ${data.tipoDocumento ? data.tipoDocumento : "-"}</div>
                        <div class="col-12 mb-2"><strong>Documento</strong> ${data.documento ? data.documento : "-"}</div>
                        <div class="col-12 mb-2"><strong>Segundo Nombre</strong> ${data.segundoNombre ? data.segundoNombre : "-"}</div>
                        <div class="col-12 mb-2"><strong>Segundo Apellido</strong> ${data.segundoApellido ? data.segundoApellido : "-"}</div>
                        <div class="col-12 mb-2"><strong>Fecha de Nacimiento</strong> ${data.fechaNacimiento ? data.fechaNacimiento : "-"}</div>
                        <div class="col-12 mb-2"><strong>Sexo</strong> ${data.sexo ? data.sexo : "-"}</div>
                    </div>
                    <br>
                    <h5 class="card-title">Domicilio</h5>
                    <hr>
                    <div class="row">
                        ${data.domicilio ? `
                            <div class="col-12 mb-2"><strong>Pais</strong> ${data.domicilio.pais && data.domicilio.pais.nombre ? data.domicilio.pais.nombre : "-"}</div>
                            <div class="col-12 mb-2"><strong>Departamento</strong> ${data.domicilio.departamento && data.domicilio.departamento.nombre ? data.domicilio.departamento.nombre : "-"}</div>
                            <div class="col-12 mb-2"><strong>Localidad</strong> ${data.domicilio.localidad && data.domicilio.localidad.nombre ? data.domicilio.localidad.nombre : "-"}</div>
                            <div class="col-12 mb-2"><strong>Barrio</strong> ${data.domicilio.barrio ? data.domicilio.barrio : "-"}</div>
                            <div class="col-12 mb-2"><strong>Direccion</strong> ${data.domicilio.direccion ? data.domicilio.direccion : "-"}</div>
                            ` : "No especificado"
                        }
                    </div>
                    <br>
                    <h5 class="card-title">Contacto</h5>
                    <hr>
                    <div class="row">
                        <div class="col-12 mb-2"><strong>Telefono</strong> Telefono</div>
                        <div class="col-12 mb-2"><strong>Telefono2</strong> Telefono2</div>
                    </div>
                </div>
            </div>

            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title text-success">Educacion y Formacion</h2>
                    <hr>
                    <div class="row">
                        <div class="col-12 mb-2"><strong>Nivel Educativo</strong> Nivel Educativo</div>
                        <div class="col-12 mb-2"><strong>Estado</strong> Estado</div>
                        <div class="col-12 mb-2"><strong>Orientacion</strong> Orientacion</div>
                    </div>
                    <br>
                    <h5 class="card-title">Capacitaciones</h5>
                    <hr>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="content">
                                <h5 class="card-title">Nombre Curso</h5>
                                <hr>
                                <div class="mb-2"><strong>Área temática</strong> Área temática</div>
                                <div class="mb-2"><strong>Institución Educativa</strong> Institución Educativa</div>
                                <div class="mb-2"><strong>Año de inicio</strong> Año de inicio</div>
                                <div class="mb-2"><strong>Duración</strong> Duración</div>
                                <div class="mb-2"><strong>Estado del curso</strong> Estado del curso</div>
                            </div>
                        </li>
                    </ul>
                    <br>
                    <h5 class="card-title">Conocimientos Informaticos</h5>
                    <hr>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="content">
                                <h5 class="card-title">Nombre Aplicacion</h5>
                                <hr>
                                <div class="mb-2"><strong>Categoria</strong> Categoria</div>
                                <div class="mb-2"><strong>Nivel Conocimiento</strong> Nivel Conocimiento</div>
                            </div>
                        </li>
                    </ul>
                    <br>
                    <h5 class="card-title">Idiomas</h5>
                    <hr>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="content">
                                <h5 class="card-title">Idioma</h5>
                                <hr>
                                <div class="mb-2"><strong>Especificacion</strong> Especificacion</div>
                                <div class="mb-2"><strong>Habla</strong> Habla</div>
                                <div class="mb-2"><strong>Comprension Auditiva</strong> Comprension Auditiva</div>
                                <div class="mb-2"><strong>Comprension Lectora</strong> Comprension Lectora</div>
                                <div class="mb-2"><strong>Escritura</strong> Escritura</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title text-success">Expreiencias Laborales</h2>
                    <hr>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="content">
                                <h5 class="card-title">Nombre Empresa</h5>
                                <hr>
                                <div class="mb-2"><strong>Cargo</strong> Cargo</div>
                                <div class="mb-2"><strong>Rubro</strong> Rubro</div>
                                <div class="mb-2"><strong>Nivel Jerarquico</strong> Nivel Jerarquico</div>
                                <div class="mb-2"><strong>Tareas Realizadas</strong> Tareas Realizadas</div>
                                <div class="mb-2"><strong>Fecha Inicio</strong> Fecha Inicio</div>
                                <div class="mb-2"><strong>Tarbajando</strong> Tarbajando</div>
                                <div class="mb-2"><strong>Fecha Fin</strong> Fecha Fin</div>
                                <br>
                                <strong>Referencia</strong>
                                <hr>
                                <div class="mb-2"><strong>Nombre</strong> Nombre</div>
                                <div class="mb-2"><strong>Apellido</strong> Apellido</div>
                                <div class="mb-2"><strong>Cargo</strong> Cargo</div>
                                <div class="mb-2"><strong>Email</strong> Email</div>
                                <div class="mb-2"><strong>Telefono</strong> Telefono</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title text-success">Permisos y Licencias</h2>
                    <hr>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="content">
                                <h5 class="card-title">Tipo</h5>
                                <hr>
                                <div class="mb-2"><strong>Vencimiento</strong> Vencimiento</div>
                                <div class="mb-2"><strong>Especificacion</strong> Especificacion</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card mb-5">
                <div class="card-body content">
                    <h2 class="card-title text-success">Intereses y preferencias</h2>
                    <hr>
                    <div class="mb-2"><strong>Jornada Laboral</strong> Jornada Laboral</div>
                    <br>
                    <h5 class="card-title">Preferencias Laborales</h5>
                    <hr>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="content">
                                <h5 class="card-title">Puesto</h5>
                                <hr>
                                <div class="mb-2"><strong>Area de Interes</strong> Area de Interes</div>
                                <div class="mb-2"><strong>Aspiracion Salarial</strong> Aspiracion Salarial</div>
                            </div>
                        </li>
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