import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Oferta } from 'src/app/models/oferta.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';

@Component({
  selector: 'app-dialogoferta',
  templateUrl: './dialogoferta.component.html',
  styleUrls: ['./dialogoferta.component.css']
})
export class DialogofertaComponent implements OnInit {

  finalizada = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Oferta,
    public authService: AuthService,
    private ofertaService: OfertaService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.finalizada = moment(this.data.fechaCierre).isBefore(moment());
  }

  deleteOferta(id: any) {
    this.ofertaService.delete(id).subscribe(
      ok => {
        this.snackBar.open("Oferta Eliminada Correctamente", "Cerrar", { duration: 5000 });
      },
      error => {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }
    );
    window.location.reload();
  }

  finish(id: any) {
    this.ofertaService.finish(id).subscribe(
      ok => {
        this.snackBar.open("Oferta Finalizada Correctamente", "Cerrar", { duration: 5000 });
      },
      error => {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }
    );
    window.location.reload();
  }
}
