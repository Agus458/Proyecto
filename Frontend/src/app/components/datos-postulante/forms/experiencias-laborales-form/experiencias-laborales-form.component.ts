import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-experiencias-laborales-form',
  templateUrl: './experiencias-laborales-form.component.html',
  styleUrls: ['./experiencias-laborales-form.component.css']
})
export class ExperienciasLaboralesFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  experienciasLaboralesForm: FormGroup = new FormGroup({});

  areasTematicas = [
    "Administración - Secretariado", "Arte - Cultura", "Atención al Cliente", "Automotriz - Mecánica", "Banca - Servicios Financieros", "Comercio - Maercado - Ventas", "Comunicación", "Oficios - Construcción - Servicios Varios", "Contabilidad - Auditoría - Finanzas", "Diseño - Marketing - Publicidad", "Estética", "Gastronomía", "Idiomas", "Informática", "Recursos Humanos", "Salud", "Seguridad / Vigilancia", "Tecnologías de la Información", "Turismo - Hotelería", "Otro"
  ];

  niveles = [
    "Independiente", "Empleado", "Supervisor", "Encargado", "Gerente", "Director",
  ];

  constructor(
    private formBuilder: FormBuilder,
    private postulantesService: PostulantesService
  ) { }

  ngOnInit(): void {
    this.experienciasLaboralesForm = this.formBuilder.group({
      experienciasLaborales: this.formBuilder.array([])
    })

    this.postulantesService.getPerfilActual().subscribe(
      result => {
        if (result.experienciasLaborales) {
          for (let index = 0; index < result.experienciasLaborales.length; index++) {
            this.addExperienciaLaboral(true);
          }
        }

        this.experienciasLaboralesForm.patchValue(result);
      },
      error => {
        console.log(error);
      }
    );

    this.formReady.emit(this.experienciasLaboralesForm);
  }

  get experienciasLaborales(): FormArray {
    return this.experienciasLaboralesForm.get("experienciasLaborales") as FormArray;
  }

  addExperienciaLaboral(id: boolean) {
    const capacitacion = this.formBuilder.group({
      nombreEmpresa: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      rubro: ['', [Validators.required]],
      nivelJerarquico: ['', [Validators.required]],
      tareasRealizadas: [''],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
      trabajando: [false, [Validators.required]],
      nombreReferencia: [''],
      apellidoReferencia: [''],
      cargoReferencia: [''],
      telefonoReferencia: [''],
      emailReferencia: [''],
    });

    if (id) capacitacion.addControl("id", new FormControl('', [Validators.required]));

    this.experienciasLaborales.push(capacitacion);
  }

  deleteExperienciaLaboral(index: number) {
    const id = this.experienciasLaborales.at(index).get("id");
    if (id) {
      this.postulantesService.deleteExperienciaLaboral(id.value).subscribe();
    }

    this.experienciasLaborales.removeAt(index);
  }

  onChangeTrabajando(index: number) {
    const experienciaLaboral = this.experienciasLaborales.at(index) as FormGroup;

    if (experienciaLaboral && experienciaLaboral.get("trabajando")?.value) {
      experienciaLaboral.removeControl("fechaFin");
    } else {
      experienciaLaboral.addControl("fechaFin", new FormControl('', [Validators.required]));
    }
  }

  getTrabajando(index: number) {
    return this.experienciasLaborales.at(index).get("trabajando");
  }
}
