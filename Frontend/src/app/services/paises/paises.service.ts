import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { proyectConfig } from 'proyectConfig';
import { Observable } from 'rxjs';
import { Pais } from 'src/app/models/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private url = proyectConfig.backEndURL + "/paises";

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  get(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.url);
  }

}
