import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { Postulante } from 'src/app/models/postulante.model';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

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

  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  constructor(
    private postulantesService: PostulantesService
  ) { }

  ngOnInit() {
    this.postulantesService.getPerfil();
  }

  ngOnSubmit() {
    const data: Postulante = {};

    Object.assign(data, this.datosPersonalesForm.value);
    Object.assign(data, this.educacionFormacionForm.value);

    console.log(data);
  }

  datosPersonalesFormInitialized(form: FormGroup) {
    this.datosPersonalesForm = form;
  }

  educacionFormacionFormInitialized(form: FormGroup) {
    this.educacionFormacionForm = form;
  }

  experienciasLaboralesFormInitialized(form: FormGroup) {
    this.experienciasLaboralesForm = form;
  }

}