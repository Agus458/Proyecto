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

  categorias: any[] = [];

  idiomas: any[] = [];

  niveles = [
    "No", "Basico", "Regular", "Fluido", "Nativo"
  ];

  nivelesEducativos: any[] = [];
  estados: any[] = [];

  areasTematicas: any[] = [];

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

      const estados = await this.perfilService.getData("estados").toPromise();
      this.estados = estados;

      const idiomas = await this.perfilService.getData("nombresIdiomas").toPromise();
      this.idiomas = idiomas;

      const categorias = await this.perfilService.getData("categoriasConocimientos").toPromise();
      this.categorias = categorias;

      const areasTematicas = await this.perfilService.getData("areasTematicas").toPromise();
      this.areasTematicas = areasTematicas;
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
          
          const entity = result.capacitaciones[index];
          if(entity.areaTematica) entity.areaTematica = entity.areaTematica.id;
          if(entity.estadoCurso) entity.estadoCurso = entity.estadoCurso.id;
        }
      }

      if (result.conocimientosInformaticos) {
        for (let index = 0; index < result.conocimientosInformaticos.length; index++) {
          this.addConocimientoInformatico(true);
          
          const entity = result.conocimientosInformaticos[index];
          if(entity.categoria) entity.categoria = entity.categoria.id;
        }
      }

      if (result.idiomas) {
        for (let index = 0; index < result.idiomas.length; index++) {
          this.addIdioma(true);
          
          const entity = result.idiomas[index];
          if(entity.nombreIdioma) entity.nombreIdioma = entity.nombreIdioma.id;
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

  buscarIdioma(id: string){
    return this.idiomas.find(elem => elem.id == id);
  }

}
