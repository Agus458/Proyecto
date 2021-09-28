import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-preferencias-laborales-form',
  templateUrl: './preferencias-laborales-form.component.html',
  styleUrls: ['./preferencias-laborales-form.component.css']
})
export class PreferenciasLaboralesFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  preferenciasLaboralesForm: FormGroup = new FormGroup({});

  areas = [
    "Administración - Secretariado", "Agroindustria", "Alimentos", "Arquitectura - Paisajismo", "Arte - Cultura", "Atención al Cliente", "Automotriz", "Banca - Servicios Financieros", "Cadetería - Cobranzas", "Comercio - Maercado - Ventas", "Comunicación", "Construcción", "Contabilidad - Auditoría - Finanzas", "Deporte - Recreación", "Directivos - Ejecutivos", "Diseño - Decoración", "Distribución - Logística - Almacenamiento", "Eduación - Docencia", "Estética", "Eventos", "Especializaciones", "Gastronomía", "Industria - Producción", "Ingeniería", "Inmobiliario", "Importación - Exportación", "Mantenimiento general", "Mecánica", "Comunicación - Marketing - Publicidad", "Oficios - Servicios Varios", "Pasantías", "Recursos Humanos", "Salud", "Sector Legal/Jurídico", "Seguridad / Vigilancia", "Supermercados - Autoservices", "Tecnologías de la Información", "Trabajo telefónico - Call Center", "Transporte", "Turismo - Hotelería", "Otro"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private postulantesService: PostulantesService
  ) { }

  ngOnInit(): void {
    this.preferenciasLaboralesForm = this.formBuilder.group({
      jornadaIndiferente: [false],
      jornadaCompleta: [false],
      jornadaManiana: [false],
      jornadaTarde: [false],
      jornadaNoche: [false],
      preferenciasLaborales: this.formBuilder.array([])
    })

    this.postulantesService.getPerfilActual().subscribe(
      result => {
        if (result.preferenciasLaborales) {
          for (let index = 0; index < result.preferenciasLaborales.length; index++) {
            this.addPreferenciaLaboral(true);
          }
        }

        this.preferenciasLaboralesForm.patchValue(result);
      },
      error => {
        console.log(error);
      }
    );

    this.formReady.emit(this.preferenciasLaboralesForm);
  }

  get preferenciasLaborales(): FormArray {
    return this.preferenciasLaboralesForm.get("preferenciasLaborales") as FormArray;
  }

  addPreferenciaLaboral(id: boolean) {
    const preferenciaLaboral = this.formBuilder.group({
      puestoPreferido: ['', [Validators.required]],
      areasInteres: ['', [Validators.required]],
      aspiracionSalarial: ['', [Validators.required]]
    });

    if (id) preferenciaLaboral.addControl("id", new FormControl('', [Validators.required]));

    this.preferenciasLaborales.push(preferenciaLaboral);
  }

  deletePreferenciaLaboral(index: number) {
    const id = this.preferenciasLaborales.at(index).get("id");
    if (id) {
      this.postulantesService.deletePermiso(id.value).subscribe();
    }

    this.preferenciasLaborales.removeAt(index);
  }

}
