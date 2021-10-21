import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { proyectConfig } from 'proyectConfig';
import { Empresa } from 'src/app/models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private url: string = proyectConfig.backEndURL + "/api/empresas";

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: SocialAuthService
  ) { }

  getEmpresas(){
    return this.http.get<Empresa[]>(this.url);
  }

  getPendientes(){
    return this.http.get<Empresa[]>(this.url + "/pendientes");
  }
}
