import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { proyectConfig } from 'proyectConfig';
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

  constructor(
    private novedadesservice: NovedadesServicesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.novedadesForm = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      contenido: ["", [Validators.required]],
      imagenNovedad: ["", []],
    });

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      try {
        const novedad = await this.novedadesservice.getNovedad(IdFromRoute).toPromise();

        if (novedad) {
          this.novedadesForm.addControl("id", new FormControl('', [Validators.required]));
          if (novedad.imagen) this.imagen = await this.getImagen(novedad.imagen);

          this.novedadesForm.patchValue(novedad);
        }
      } catch (error) {

      }
    }
  }

  async getImagen(url: string) {
    if (url) {
      return await this.novedadesservice.getArchivo(proyectConfig.backEndURL + "/" + url);
    }

    return undefined;
  }

  async ngOnSubmit() {
    let nuevaNovedad: Novedad = this.novedadesForm.value;

    if (this.novedadesForm.contains("id")) {
      try {
        await this.novedadesservice.putNovedad(nuevaNovedad.id, nuevaNovedad).toPromise();

        const imagen = this.novedadesForm.get("imagenNovedad");
        if (imagen && imagen.value instanceof File) {
          const formData = new FormData();
          formData.append("imagen", imagen.value);
          await this.novedadesservice.putImagen(nuevaNovedad.id, formData).toPromise();
        }

        this.snackBar.open("Novedad Actualizada Correctamente", "Cerrar", { duration: 5000 });
        this.router.navigateByUrl("/listarnovedades");
      } catch (error: any) {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }

    } else {
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
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.novedadesForm.get('imagenNovedad')?.setValue(file);
      this.imagen = URL.createObjectURL(file);
    }
  }

}

