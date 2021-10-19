import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Oferta } from 'src/app/models/oferta.model';
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

  constructor(public dialog: MatDialog, private ofertasService: OfertaService) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogofertaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.ofertasService.getOfertasEmpresaActual().subscribe(
      ok => {
        console.log(ok);
        
        this.ofertas = ok;
      },
      error => {
        console.log(error);

      }
    );
  }

  delete(id: number) {

  }
}
