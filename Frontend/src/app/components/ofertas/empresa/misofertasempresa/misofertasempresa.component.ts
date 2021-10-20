import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  displayedColumns: string[] = ['id', 'puesto', 'fechaPublicacion', 'fechaCierre', 'mas'];

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

  ngOnInit() {
    if (this.authService.getUser()?.tipo == "Empresa") {
      this.ofertasService.getOfertasEmpresaActual().subscribe(
        ok => {
          this.ofertas = ok;
        },
        error => { }
      );
    } else {
      this.ofertasService.getAll().subscribe(
        ok => {
          this.ofertas = ok;
        },
        error => { }
      );
    }
  }

  delete(id: number) {

  }
}
