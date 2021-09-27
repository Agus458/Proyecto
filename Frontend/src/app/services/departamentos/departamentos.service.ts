import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proyectConfig } from 'proyectConfig';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private url = proyectConfig.backEndURL + "/api/departamentos";

  constructor(
    private http: HttpClient
  ) { }

  getByPais(id: any): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url + "/pais/" + id);
  }
  
}
