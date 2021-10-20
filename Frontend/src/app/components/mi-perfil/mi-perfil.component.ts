import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { proyectConfig } from 'proyectConfig';
import { Postulante } from 'src/app/models/postulante.model';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  postulante: Postulante | undefined;

  imagen: string | undefined;

  cv: string | undefined;

  generatedPdf: string | undefined;

  constructor(
    private postulantes: PostulantesService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      this.postulantes.getPerfilById(IdFromRoute);
    } else {
      this.postulantes.getPerfil();
    }

    this.postulantes.getPerfilActual().subscribe(async result => {
      if (result.imagen) {
        this.imagen = await this.postulantes.getArchivo(proyectConfig.backEndURL + "/" + result.imagen);
      }
      if (result.cv) {
        this.cv = await this.postulantes.getArchivo(proyectConfig.backEndURL + "/" + result.cv);
      }

      if (result.id) this.generatedPdf = await this.postulantes.generarPdf(result.id);

      this.postulante = result;
      console.log(this.postulante);
      
    });
  }

}
