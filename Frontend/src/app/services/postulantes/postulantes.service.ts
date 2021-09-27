import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { proyectConfig } from 'proyectConfig';
import { Observable } from 'rxjs';
import { Postulante } from 'src/app/models/postulante.model';

@Injectable({
  providedIn: 'root'
})
export class PostulantesService {

  private url: string = proyectConfig.backEndURL + "/api/postulantes";
  private postulanteActual!: Observable<Postulante>;

  constructor(
    private http: HttpClient
  ) { }

  getPerfil(): void {
    this.postulanteActual = this.http.get<Postulante>(this.url + "/perfil");
  }

  getPerfilActual(): Observable<Postulante> {
    return this.postulanteActual;
  }

  async getImagen(url: string) {
    let imagen;

    try {
      const response = await this.http.get(url, {
        observe: 'response', responseType: 'blob'
      }).toPromise();

      imagen = URL.createObjectURL(response.body);
    } catch (error) {
      console.log(error);
    }

    return imagen;
  }

}