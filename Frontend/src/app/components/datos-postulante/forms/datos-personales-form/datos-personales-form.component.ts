import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { proyectConfig } from 'proyectConfig';
import { Departamento } from 'src/app/models/departamento.model';
import { Localidad } from 'src/app/models/localidad.model';
import { Pais } from 'src/app/models/pais.model';
import { Postulante } from 'src/app/models/postulante.model';
import { DepartamentosService } from 'src/app/services/departamentos/departamentos.service';
import { LocalidadesService } from 'src/app/services/localidades/localidades.service';
import { PaisesService } from 'src/app/services/paises/paises.service';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-datos-personales-form',
  templateUrl: './datos-personales-form.component.html',
  styleUrls: ['./datos-personales-form.component.css']
})
export class DatosPersonalesFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  datosPersonalesForm: FormGroup = new FormGroup({});

  paises: Pais[] = [];
  selectedPais: number | undefined;

  departamentos: Departamento[] = [];
  selectedDepartamento: number | undefined;

  localidades: Localidad[] = [];

  imagen: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService,
    private departamentosService: DepartamentosService,
    private localidadesService: LocalidadesService,
    private postulantesService: PostulantesService
  ) { }

  async ngOnInit(): Promise<void> {
    const domicilio = this.formBuilder.group({
      direccion: ['', Validators.required],
      barrio: [''],
      pais: ['', Validators.required],
    });

    this.datosPersonalesForm = this.formBuilder.group({
      tipoDocumento: [Number, Validators.required],
      documento: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      primerTelefono: ['', Validators.required],
      segundoTelefono: [''],
      sexo: ['', Validators.required],
      fechaNacimiento: [moment(), Validators.required],
      recivirEmails: [false, Validators.required],
      domicilio: domicilio,
    });

    try {
      const result = await this.paisesService.get().toPromise();
      this.paises = result;
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await this.postulantesService.getPerfilActual().toPromise();
      const domicilio = this.datosPersonalesForm.get("domicilio") as FormGroup;
      domicilio.addControl("departamento", new FormControl('', [Validators.required]));
      domicilio.addControl("localidad", new FormControl('', [Validators.required]));

      this.datosPersonalesForm.patchValue(result);
      this.imagen = await this.postulantesService.getImagen(proyectConfig.backEndURL + "/" + result.imagen);

      this.onChangePais();
      this.onChangeDepartamento();

    } catch (error) {
      console.log(error);
    }

    this.formReady.emit(this.datosPersonalesForm);
  }

  onChangePais() {
    this.selectedPais = this.datosPersonalesForm.get("domicilio")?.get("pais")?.value;

    if (this.selectedPais) {
      const domicilio = this.datosPersonalesForm.get("domicilio") as FormGroup;
      if (this.getPais(this.selectedPais)?.nombre === "Uruguay") {
        domicilio.addControl("departamento", new FormControl('', [Validators.required]));
        domicilio.addControl("localidad", new FormControl('', [Validators.required]));

        this.departamentosService.getByPais(this.selectedPais).subscribe(
          result => {
            this.departamentos = result;
          },
          error => {
            console.log(error);
          }
        );
      } else {
        domicilio.removeControl("departamento");
        domicilio.removeControl("localidad");
      }
    }
  }

  getPais(id: any) {
    return this.paises.find(pais => pais.id === id);
  }

  onChangeDepartamento(): void {
    this.selectedDepartamento = this.datosPersonalesForm.get("domicilio")?.get("departamento")?.value;

    if (this.selectedDepartamento) {
      this.localidadesService.getByDepartamento(this.selectedDepartamento).subscribe(
        result => {
          this.localidades = result;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
