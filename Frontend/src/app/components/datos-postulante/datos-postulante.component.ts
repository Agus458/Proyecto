import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Postulante } from 'src/app/models/postulante.model';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private postulantesService: PostulantesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.postulantesService.getPerfil();
  }

  async ngOnSubmit() {
    const data: Postulante = {};

    Object.assign(data, this.datosPersonalesForm.value);
    Object.assign(data, this.educacionFormacionForm.value);
    Object.assign(data, this.experienciasLaboralesForm.value);
    Object.assign(data, this.permisosForm.value);
    Object.assign(data, this.interesesForm.value);
    Object.assign(data, this.cvForm.value);

    console.log(data);

    try {
      const imagenPerfil = this.datosPersonalesForm.get("imagenPerfil");
      if (imagenPerfil && imagenPerfil.value instanceof File) {
        const formData = new FormData();
        formData.append("imagen", imagenPerfil.value);
        await this.postulantesService.putImagen(formData).toPromise();
      }

      const cvPerfil = this.cvForm.get("cvPerfil");
      if (cvPerfil && cvPerfil.value instanceof File) {
        const formData = new FormData();
        formData.append("cv", cvPerfil.value);
        await this.postulantesService.putCV(formData).toPromise();
      }

      await this.postulantesService.putPerfil(data).toPromise();

      this.snackBar.open("Actualizacion exitosa!", "Close", { duration: 5000 });
      this.router.navigateByUrl("/miperfil");
    } catch (error: any) {
      this.snackBar.open(error.error.message, "Close", { duration: 5000 });
    }

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

  permisosFormInitialized(form: FormGroup) {
    this.permisosForm = form;
  }

  preferenciasLaboralesFormInitialized(form: FormGroup) {
    this.interesesForm = form;
  }

  cvFormInitialized(form: FormGroup) {
    this.cvForm = form;
  }

}