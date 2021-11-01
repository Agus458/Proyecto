import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Oferta } from 'src/app/models/oferta.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';
import { MatDialog } from '@angular/material/dialog';
import { CompartirNovedadDialogComponent } from '../novedades/compartir-novedad-dialog/compartir-novedad-dialog.component';

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
    private router: Router,
    private dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    this.ofertasService.getOferta(IdFromRoute).subscribe(
      ok => {
        this.oferta = ok;
        console.log(this.oferta);
        
        if (this.oferta.id && this.authService.getUser()?.tipo == "Postulante") {
          this.ofertasService.postulado(this.oferta.id).subscribe(
            res => {
              this.postulado = res.postulado;
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

  compartir(): void {
    this.dialog.open(CompartirNovedadDialogComponent, {
      data: {
        url: window.location.protocol + "//" + window.location.host + "/ofertas/" + this.oferta?.id,
        class: this.oferta
      } 
    });
  }
}
