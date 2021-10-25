import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from 'src/app/models/oferta.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  oferta: Oferta | undefined;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private ofertasService: OfertaService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    this.ofertasService.getOferta(IdFromRoute).subscribe(
      ok => {
        this.oferta = ok;
      }
    )
  }

  postularse() {
    if(this.oferta?.id){
      this.ofertasService.inscribirse(this.oferta.id).subscribe();
    }
  }

}
