import { Component, OnInit } from '@angular/core';
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

  constructor(private postulantes: PostulantesService) { }

  async ngOnInit(): Promise<void> {
    this.postulantes.getPerfil();
    this.postulantes.getPerfilActual().subscribe(async result => { 
      console.log(result);
      if (result.imagen) {
        this.imagen = await this.postulantes.getArchivo(proyectConfig.backEndURL + "/" + result.imagen);
      }
      this.postulante = result });
  }



}
