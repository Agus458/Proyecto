import { Component, Input, OnInit } from '@angular/core';
import { proyectConfig } from 'proyectConfig';
import { Novedad } from 'src/app/models/novedad.model';
import { Oferta } from 'src/app/models/oferta.model';
import { IsMobileService } from 'src/app/services/ismobile/is-mobile.service';
import { NovedadesServicesService } from 'src/app/services/novedades/novedades-services.service';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {

  novedades: Novedad[] = [];
  ofertas: Oferta[] = [];

  constructor(public ismobile: IsMobileService, private novedadesservice: NovedadesServicesService, private ofertasService: OfertaService) { }

  async ngOnInit() {
    try {
      const data = await this.novedadesservice.getNovedades().toPromise();
      this.novedades = data.novedades;

      for (let index = 0; index < this.novedades.length; index++) {
        const element = this.novedades[index];

        if (element.imagen) element.imagen = await this.getImagen(element.imagen);
      }

      const dataofertas = await this.ofertasService.getOfertas().toPromise();
      this.ofertas = dataofertas.data;
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