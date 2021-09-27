import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proyectConfig } from 'proyectConfig';
import { Observable } from 'rxjs';
import { Localidad } from 'src/app/models/localidad.model';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  private url = proyectConfig.backEndURL + "/api/localidades";

  constructor(
    private http: HttpClient
  ) { }

  getByDepartamento(id: any): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(this.url + "/departamento/" + id);
  }

}
