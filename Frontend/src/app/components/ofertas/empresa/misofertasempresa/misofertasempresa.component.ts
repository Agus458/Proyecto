import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { Oferta } from 'src/app/models/oferta.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';
import { DialogofertaComponent } from './dialogoferta/dialogoferta.component';

@Component({
  selector: 'app-misofertasempresa',
  templateUrl: './misofertasempresa.component.html',
  styleUrls: ['./misofertasempresa.component.css']
})
export class MisofertasempresaComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['id', 'nombre', 'puesto', 'fechaPublicacion', 'fechaCierre', 'estado', 'mas'];

  ofertas: Oferta[] = [];

  constructor(
    public dialog: MatDialog,
    private ofertasService: OfertaService,
    public authService: AuthService,
  ) { }

  openDialog(oferta: Oferta) {
    this.dialog.open(DialogofertaComponent, {
      data: oferta
    });
  }

  paginatorChange(event?: PageEvent) {
    if (event) {
      const skip = event.pageIndex * event.pageSize;
      this.getOfertas(skip, event.pageSize);
    }
  }

  getOfertas(skip: number, take: number) {
    if (this.authService.getUser()?.tipo == "Empresa") {
      this.ofertasService.getOfertasEmpresaActual().subscribe(
        ok => {
          this.ofertas = ok.data;
          this.length = ok.cantidad;
        },
        error => { }
      );
    } else {
      this.ofertasService.getAll().subscribe(
        ok => {
          this.ofertas = ok.data;
          this.length = ok.cantidad;
        },
        error => { }
      );
    }
  }

  ngOnInit() {
    if (this.authService.getUser()?.tipo == "Administrador") this.displayedColumns.splice(this.displayedColumns.length - 1, 0, 'empresa');

    this.getOfertas(0, 9);
  }

  estado(fecha: Date) {
    return moment(fecha).isBefore(moment()) ? "Finalizada" : "Activa"
  }
}
