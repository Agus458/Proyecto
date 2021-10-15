import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadesServicesService } from 'src/app/services/novedades/novedades-services.service';

@Component({
  selector: 'app-agregarnovedades',
  templateUrl: './agregarnovedades.component.html',
  styleUrls: ['./agregarnovedades.component.css']
})
export class AgregarnovedadesComponent implements OnInit {

  imagen: string | undefined;

  novedadesForm: FormGroup = new FormGroup({});

  constructor(private novedadesservice: NovedadesServicesService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.novedadesForm = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      contenido: ["", [Validators.required]],
      imagenNovedad: ["", []],
    });
  }

  async ngOnSubmit() {
    let nuevaNovedad: Novedad = this.novedadesForm.value;
    
    try {
      nuevaNovedad = await this.novedadesservice.postNovedades(nuevaNovedad).toPromise();

      const imagen = this.novedadesForm.get("imagenNovedad");
      if (imagen && imagen.value instanceof File) {
        const formData = new FormData();
        formData.append("imagen", imagen.value);
        await this.novedadesservice.putImagen(nuevaNovedad.id, formData).toPromise();
      }

      this.snackBar.open("Novedad creada Correctamente", "Cerrar", { duration: 5000 });
      this.router.navigateByUrl("/listarnovedades");
    } catch (error: any) {
      this.snackBar.open(error.error.message, "Close", { duration: 5000 });
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.novedadesForm.get('imagenNovedad')?.setValue(file);
      this.imagen = URL.createObjectURL(file);
    }
  }

}

