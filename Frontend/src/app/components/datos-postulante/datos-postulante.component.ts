import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { Postulante } from 'src/app/models/postulante.model';
import * as moment from 'moment';
import { Pais } from 'src/app/models/pais.model';
import { PaisesService } from 'src/app/services/paises/paises.service';
import { Departamento } from 'src/app/models/departamento.model';
import { Localidad } from 'src/app/models/localidad.model';
import { DepartamentosService } from 'src/app/services/departamentos/departamentos.service';
import { LocalidadesService } from 'src/app/services/localidades/localidades.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-datos-postulante',
  templateUrl: './datos-postulante.component.html',
  styleUrls: ['./datos-postulante.component.css']
})
export class DatosPostulanteComponent implements OnInit {

  datosPersonalesForm: FormGroup = new FormGroup({});
  educacionFormacionForm: FormGroup = new FormGroup({});
  experienciasLaboralesForm: FormGroup = new FormGroup({});
  permisosForm: FormGroup = new FormGroup({});
  interesesForm: FormGroup = new FormGroup({});
  cvForm: FormGroup = new FormGroup({});

  paises: Pais[] = [];
  selectedPais: number | undefined;

  departamentos: Departamento[] = [];
  selectedDepartamento: number | undefined;

  localidades: Localidad[] = [];

  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService,
    private departamentosService: DepartamentosService,
    private localidadesService: LocalidadesService
  ) { }

  ngOnInit() {
    const domicilio = this.formBuilder.group({
      direccion: ['', Validators.required],
      barrio: [''],
      pais: ['', Validators.required],
    });

    this.datosPersonalesForm = this.formBuilder.group({
      tipoDocumento: ['', Validators.required],
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

    this.paisesService.get().subscribe(
      result => {
        this.paises = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnSubmit() {
    const data: Postulante = {};

    Object.assign(data, this.datosPersonalesForm.value);

    console.log(data);
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

  getPais(id: number) {
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