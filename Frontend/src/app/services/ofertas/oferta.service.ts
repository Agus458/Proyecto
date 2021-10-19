import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { proyectConfig } from 'proyectConfig';
import { Oferta } from 'src/app/models/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  private url: string = proyectConfig.backEndURL + "/api/ofertas";

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: SocialAuthService
  ) { }

  getOfertas(){
    return this.http.get<Oferta[]>(this.url);
  }

  getOfertasEmpresaActual(){
    return this.http.get<Oferta[]>(this.url + "/empresa");
  }

  getAll(){
    return this.http.get<Oferta[]>(this.url + "/all");
  }

  getOferta(id: number){
    return this.http.get<Oferta>(this.url + "/" + id);
  }

  postOferta(oferta: Oferta) {
    return this.http.post<Oferta>(this.url, oferta);
  }

  putOferta(id: number, oferta: Oferta) {
    return this.http.put(this.url + `/${id}`, oferta);
  }

}
