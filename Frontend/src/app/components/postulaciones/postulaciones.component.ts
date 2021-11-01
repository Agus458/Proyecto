import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Oferta } from 'src/app/models/oferta.model';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['id', 'nombre', 'puesto', 'fechaPublicacion', 'fechaCierre', 'empresa', 'mas'];

  ofertas: Oferta[] = [];

  constructor(
    private ofertasService: OfertaService
  ) { }

  ngOnInit(): void {
    this.getOfertasPostulante(0, this.pageSize);
  }

  getOfertasPostulante(skip: number, take: number) {
    this.ofertasService.getOfertasPostulante(skip, take).subscribe(
      result => {
        this.ofertas = result.data;
        this.length = result.cantidad;
      }
    );
  }

  paginatorChange(event?: PageEvent) {
    if (event) {
      const skip = event.pageIndex * event.pageSize;
      this.getOfertasPostulante(skip, event.pageSize);
    }
  }

}
