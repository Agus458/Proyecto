import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
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

  nivelesEducativos: any[] = [];
  estadosNivelEducativo: any[] = [];

  areasTematicas = [];

  constructor(
    private formBuilder: FormBuilder,
    private postulantesService: PostulantesService,
    private perfilService: PerfilService
  ) { }

  async ngOnInit() {
    this.educacionFormacionForm = this.formBuilder.group({
      nivelEducativo: ['', [Validators.required]],
      estadoNivelEducativo: ['', [Validators.required]],
      capacitaciones: this.formBuilder.array([]),
      conocimientosInformaticos: this.formBuilder.array([]),
      idiomas: this.formBuilder.array([])
    });

    try {
      const nivelesEducativos = await this.perfilService.getData("nivelesEducativos").toPromise();
      this.nivelesEducativos = nivelesEducativos;

      const estadosNivelEducativo = await this.perfilService.getData("estadosNivelEducativo").toPromise();
      this.estadosNivelEducativo = estadosNivelEducativo;
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await this.postulantesService.getPerfilActual().toPromise();

      if (result.nivelEducativo) result.nivelEducativo = result.nivelEducativo.id;
      if (result.estadoNivelEducativo) result.estadoNivelEducativo = result.estadoNivelEducativo.id;

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
    } catch (error) {

    }


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
    const id = this.capacitacionesForm.at(index).get("id");
    if (id) {
      this.postulantesService.deleteCapacitacion(id.value).subscribe();
    }

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
    const id = this.conocimientosInformaticosForm.at(index).get("id");
    if (id) {
      this.postulantesService.deleteConocimientoInformatico(id.value).subscribe();
    }

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
    const id = this.idiomasForm.at(index).get("id");
    if (id) {
      this.postulantesService.deleteIdioma(id.value).subscribe();
    }

    this.idiomasForm.removeAt(index);
  }

}
