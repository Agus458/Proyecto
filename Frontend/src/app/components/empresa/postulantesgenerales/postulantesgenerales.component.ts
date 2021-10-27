import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Postulante } from 'src/app/models/postulante.model';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';
import { FiltrosdialogComponent } from './filtrosdialog/filtrosdialog.component';

@Component({
  selector: 'app-postulantesgenerales',
  templateUrl: './postulantesgenerales.component.html',
  styleUrls: ['./postulantesgenerales.component.css']
})
export class PostulantesgeneralesComponent implements OnInit {

  postulantes: Postulante[] = []

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'mas'];
  
  filtros: any;

  constructor(
    private ofertasService: OfertaService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    
  ) { }

  openDialog() {
    const dialogRef =
    this.dialog.open(FiltrosdialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.filtros = result;
    });

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    this.ofertasService.getPostulantesOferta(IdFromRoute).subscribe(
      ok => {
        this.postulantes = ok;
      }
    );
  }

  
}



