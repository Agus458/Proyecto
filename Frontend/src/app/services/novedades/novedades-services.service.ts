import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proyectConfig } from 'proyectConfig';
import { Novedad } from 'src/app/models/novedad.model';

@Injectable({
  providedIn: 'root'
})
export class NovedadesServicesService {

  url=proyectConfig.backEndURL + "/api/novedades"
  constructor(private http:HttpClient) {}

  getNovedades(){
    return this.http.get<any>(this.url);
  }

  postNovedades(novedad:Novedad){
    return this.http.post(this.url,novedad);
  }
}
