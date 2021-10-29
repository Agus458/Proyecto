import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompartirNovedadDialogComponent } from 'src/app/components/novedades/compartir-novedad-dialog/compartir-novedad-dialog.component';
import { Novedad } from 'src/app/models/novedad.model';
import { Oferta } from 'src/app/models/oferta.model';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';
import { OfertasComponent } from '../../ofertas.component';

@Component({
  selector: 'app-portalofertas',
  templateUrl: './portalofertas.component.html',
  styleUrls: ['./portalofertas.component.css']
})
export class PortalofertasComponent implements OnInit {

  ofertas: Oferta[] = [];

  constructor(private ofertasService: OfertaService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    try {
      const ofertas = await this.ofertasService.getOfertas().toPromise();
      this.ofertas = ofertas.data;
    } catch (error) {

    }
  }

  compartir(oferta: Oferta): void {
    this.dialog.open(CompartirNovedadDialogComponent, {
      data: {
        url: window.location.protocol + "//" + window.location.host + "/ofertas/" + oferta.id,
        class: oferta
      } 
    });
  }
}
