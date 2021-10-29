import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Oferta } from 'src/app/models/oferta.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  postulado: boolean = true;

  oferta: Oferta | undefined;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public postulanteService: PostulantesService,
    public ofertasService: OfertaService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    this.ofertasService.getOferta(IdFromRoute).subscribe(
      ok => {
        this.oferta = ok;
        if (this.oferta.id) {
          this.ofertasService.postulado(this.oferta.id).subscribe(
            res => {
              this.postulado = res.postulado;
              console.log(this.postulado);
            }
          );
        }
      }
    )
  }

  postularse() {
    if (this.oferta?.id) {
      this.ofertasService.inscribirse(this.oferta.id).subscribe(
        ok => {
          this.snackBar.open("Postulacion exitoso!", "Close", { duration: 5000 });
          this.router.navigate(['/']);
        },
        error => {
          this.snackBar.open(error.error.message, "Close", { duration: 5000 });
          if (error.error.message == "Perfil incompleto") {
            this.router.navigate(['/misdatos']);
          }
        }
      );
    }
  }

}
