import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proyectConfig } from 'proyectConfig';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url = proyectConfig.backEndURL + "/api/"

  constructor(private http: HttpClient) { }

  getData(type: string){
    return this.http.get<any[]>(this.url + `${type}`);
  }

}
