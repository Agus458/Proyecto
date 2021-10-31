import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Postulante } from 'src/app/models/postulante.model';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';
import { FiltrosdialogComponent } from './filtrosdialog/filtrosdialog.component';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.css']
})
export class ListaPostulantesComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  postulantes: Postulante[] = []

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'mas'];

  filtros: any;
  id: number;

  constructor(
    private ofertasService: OfertaService,
    private postulantesService: PostulantesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.getPostulantes(0, this.pageSize);
  }

  getPostulantes(skip: number, take: number, filters?: any) {
    if(this.id){
      this.ofertasService.getPostulantesOferta(this.id, skip, take, filters).subscribe(
        ok => {
          console.log(ok);
          
          this.postulantes = ok.data;
          this.length = ok.cantidad;
        }
      );
    } else {
      this.postulantesService.getPostulantesPublicos(skip, take, filters).subscribe(
        ok => {
          console.log(ok);
          
          this.postulantes = ok.data;
          this.length = ok.cantidad;
        }
      );
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(FiltrosdialogComponent, {
      data: this.filtros
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filtros = result;
      this.getPostulantes(0, this.pageSize, this.filtros);
    });

  }

  paginatorChange(event?: PageEvent) {
    if (event) {
      const skip = event.pageIndex * event.pageSize;
      this.getPostulantes(skip, event.pageSize, this.filtros);
    }
  }

}
