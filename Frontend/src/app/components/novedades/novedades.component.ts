import { Component, OnInit } from '@angular/core';
import { proyectConfig } from 'proyectConfig';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadesServicesService } from 'src/app/services/novedades/novedades-services.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  novedades: Novedad[] = [];

  constructor(private novedadesservice: NovedadesServicesService) { }

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

}
