import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { CompartirNovedadDialogComponent } from 'src/app/components/novedades/compartir-novedad-dialog/compartir-novedad-dialog.component';
import { Novedad } from 'src/app/models/novedad.model';
import { Oferta } from 'src/app/models/oferta.model';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';
import { OfertasComponent } from '../../ofertas.component';
import { FiltroPortalDialogComponent } from './filtro-portal-dialog/filtro-portal-dialog.component';

@Component({
  selector: 'app-portalofertas',
  templateUrl: './portalofertas.component.html',
  styleUrls: ['./portalofertas.component.css']
})
export class PortalofertasComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  ofertas: Oferta[] = [];
  filtros: any;
  
  constructor(
    private ofertasService: OfertaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getOfertas(0, this.pageSize);
  }

  compartir(oferta: Oferta): void {
    this.dialog.open(CompartirNovedadDialogComponent, {
      data: {
        url: window.location.protocol + "//" + window.location.host + "/ofertas/" + oferta.id,
        class: oferta
      }
    });
  }

  getOfertas(skip: number, take: number, filters?: any) {
    this.ofertasService.getOfertas(skip, take, filters).subscribe(
      result => {
        this.ofertas = result.data;
        this.length = result.cantidad;
      }
    );
  }

  paginatorChange(event?: PageEvent) {
    if (event) {
      const skip = event.pageIndex * event.pageSize;
      this.getOfertas(skip, event.pageSize);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(FiltroPortalDialogComponent, {
      data: this.filtros
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filtros = result;
      this.getOfertas(0, this.pageSize, this.filtros);
    });

  }

}
