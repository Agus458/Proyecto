import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Postulante } from 'src/app/models/postulante.model';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.css']
})
export class ListaPostulantesComponent implements OnInit {

  postulantes: Postulante[] = []

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'mas'];

  constructor(
    private ofertasService: OfertaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    this.ofertasService.getPostulantesOferta(IdFromRoute).subscribe(
      ok => {
        this.postulantes = ok.data;
      }
    );
  }

}
