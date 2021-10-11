import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadesServicesService } from 'src/app/services/novedades/novedades-services.service';

@Component({
  selector: 'app-agregarnovedades',
  templateUrl: './agregarnovedades.component.html',
  styleUrls: ['./agregarnovedades.component.css']
})
export class AgregarnovedadesComponent implements OnInit {

  novedadesForm: FormGroup = new FormGroup({});
  constructor(private novedadesservice: NovedadesServicesService, private formBuilder: FormBuilder, private matBar:MatSnackBar) { }


  ngOnInit(): void {
    this.novedadesForm = this.formBuilder.group({
      titulo: ["",[Validators.required]],
      contenido: ["",[Validators.required]],
      imagen: ["",[]],
    });
  }

  ngOnSubmit() {
    const nuevaNovedad: Novedad = this.novedadesForm.value;
    this.novedadesservice.postNovedades(nuevaNovedad).subscribe(
      ok => {
        this.matBar.open("Novedad creada Correctamente", "Cerrar", {duration: 5000});
      },
      error => {
        this.matBar.open("No se pudo crear la Novedad","Cerrar", {duration: 5000});
      }
    );
    
  }



  
}
