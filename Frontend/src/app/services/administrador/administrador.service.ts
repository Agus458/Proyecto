import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { proyectConfig } from 'proyectConfig';
import { Oferta } from 'src/app/models/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private url: string = proyectConfig.backEndURL + "/api/administradores";

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  habilitarEmpresa(id: number, data: any){
    return this.http.put(this.url + "/habilitarEmpresa/" + id, data);
  }
}
