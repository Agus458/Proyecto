import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-educacion-formacion-form',
  templateUrl: './educacion-formacion-form.component.html',
  styleUrls: ['./educacion-formacion-form.component.css']
})
export class EducacionFormacionFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>()

  educacionFormacionForm: FormGroup = new FormGroup({});

  categorias = [
    "Ofimática", "Base de datos", "Comunicación", "Diseño", "Herramientas de Gestión", "Herramientas de Contabilidad", "Lenguaje de Programación", "Paquetes integrados", "Sistemas Operativos", "Otro"
  ];

  idiomas = [
    "Alemán", "Chino", "Coreano", "Español", "Francés", "Inglés", "Italiano", "Japonés", "Portugués", "Lenguaje de Señas", "Otro"
  ];

  niveles = [
    "No", "Basico", "Regular", "Fluido", "Nativo"
  ];

  areasTematicas = [
    "Administración - Secretariado", "Arte - Cultura", "Atención al Cliente", "Automotriz - Mecánica", "Banca - Servicios Financieros", "Comercio - Maercado - Ventas", "Comunicación", "Oficios - Construcción - Servicios Varios", "Contabilidad - Auditoría - Finanzas", "Diseño - Marketing - Publicidad", "Estética", "Gastronomía", "Idiomas", "Informática", "Recursos Humanos", "Salud", "Seguridad / Vigilancia", "Tecnologías de la Información", "Turismo - Hotelería", "Otro"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private postulantesService: PostulantesService
  ) { }

  ngOnInit(): void {
    this.educacionFormacionForm = this.formBuilder.group({
      nivelEducativo: ['', [Validators.required]],
      estadoNivelEducativo: ['', [Validators.required]],
      capacitaciones: this.formBuilder.array([]),
      conocimientosInformaticos: this.formBuilder.array([]),
      idiomas: this.formBuilder.array([])
    });

    this.postulantesService.getPerfilActual().subscribe(
      result => {
        if (result.capacitaciones) {
          for (let index = 0; index < result.capacitaciones.length; index++) {
            this.addCapacitacion(true);
          }
        }

        if (result.conocimientosInformaticos) {
          for (let index = 0; index < result.conocimientosInformaticos.length; index++) {
            this.addConocimientoInformatico(true);
          }
        }

        if (result.idiomas) {
          for (let index = 0; index < result.idiomas.length; index++) {
            this.addIdioma(true);
          }
        }

        this.educacionFormacionForm.patchValue(result);
      },
      error => {
        console.log(error);
      }
    );

    this.formReady.emit(this.educacionFormacionForm);
  }

  // Controles de Capacitaciones
  get capacitacionesForm(): FormArray {
    return this.educacionFormacionForm.get("capacitaciones") as FormArray;
  }

  addCapacitacion(id: boolean) {
    const capacitacion = this.formBuilder.group({
      nombreCurso: ['', [Validators.required]],
      areaTematica: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      anioInicio: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      tipoDuracion: ['', [Validators.required]],
      estadoCurso: ['', [Validators.required]]
    });

    if (id) capacitacion.addControl("id", new FormControl('', [Validators.required]));

    this.capacitacionesForm.push(capacitacion);
  }

  deleteCapacitacion(index: number) {
    this.capacitacionesForm.removeAt(index);
  }

  // Controles de Conocimientos Informaticos
  get conocimientosInformaticosForm(): FormArray {
    return this.educacionFormacionForm.get("conocimientosInformaticos") as FormArray;
  }

  addConocimientoInformatico(id: boolean) {
    const conocimientoInformatico = this.formBuilder.group({
      nombreAplicacion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      nivelConocimiento: ['', [Validators.required]]
    });

    if (id) conocimientoInformatico.addControl("id", new FormControl('', [Validators.required]));

    this.conocimientosInformaticosForm.push(conocimientoInformatico);
  }

  deleteConocimientoInformatico(index: number) {
    this.conocimientosInformaticosForm.removeAt(index);
  }

  // Controles de Idiomas
  get idiomasForm(): FormArray {
    return this.educacionFormacionForm.get("idiomas") as FormArray;
  }

  addIdioma(id: boolean) {
    const idioma = this.formBuilder.group({
      nombreIdioma: ['', [Validators.required]],
      especificacion: ['', []],
      habla: ['', [Validators.required]],
      comprensionAuditiva: ['', [Validators.required]],
      comprensionLectora: ['', [Validators.required]],
      escritura: ['', [Validators.required]]
    });

    if (id) idioma.addControl("id", new FormControl('', [Validators.required]));

    this.idiomasForm.push(idioma);
  }

  deleteIdioma(index: number) {
    this.idiomasForm.removeAt(index);
  }

}
