import { Component, Input, OnInit } from '@angular/core';
import { proyectConfig } from 'proyectConfig';
import { Novedad } from 'src/app/models/novedad.model';
import { Oferta } from 'src/app/models/oferta.model';
import { IsMobileService } from 'src/app/services/ismobile/is-mobile.service';
import { NovedadesServicesService } from 'src/app/services/novedades/novedades-services.service';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  ofertas: Oferta[] = [];

  constructor(public ismobile: IsMobileService, private novedadesservice: NovedadesServicesService, private ofertasService: OfertaService) { }

  async ngOnInit() {
    try {
      const ofertas = await this.ofertasService.getOfertas(0, 9).toPromise();
      this.ofertas = ofertas.data;
    } catch (error) {

    }
  }
}
