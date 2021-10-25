import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { proyectConfig } from 'proyectConfig';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadesServicesService } from 'src/app/services/novedades/novedades-services.service';
import { CompartirNovedadDialogComponent } from './compartir-novedad-dialog/compartir-novedad-dialog.component';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  novedades: Novedad[] = [];

  constructor(private novedadesservice: NovedadesServicesService, private dialog: MatDialog) { }

  async ngOnInit() {
    try {
      const data = await this.novedadesservice.getNovedades().toPromise();
      this.novedades = data.novedades;

      for (let index = 0; index < this.novedades.length; index++) {
        const element = this.novedades[index];

        if (element.imagen) element.imagen = await this.getImagen(element.imagen);
      }
    } catch (error) {

    }
  }

  async getImagen(url: string) {
    if (url) {
      return await this.novedadesservice.getArchivo(proyectConfig.backEndURL + "/" + url);
    }

    return undefined;
  }

  compartir(id: number, novedad: Novedad): void {
    this.dialog.open(CompartirNovedadDialogComponent, {
      data: {
        url: window.location.protocol + "//" + window.location.host + "/vistanovedad/" + id,
        novedad
      } 
    });
  }

}