import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proyectConfig } from 'proyectConfig';
import { Novedad } from 'src/app/models/novedad.model';

@Injectable({
  providedIn: 'root'
})
export class NovedadesServicesService {

  url = proyectConfig.backEndURL + "/api/novedades"
  constructor(private http: HttpClient) { }

  getNovedades(skip?: number, take?: number) {
    return this.http.get<{ novedades: Novedad[], cantidad: number }>(this.url, {
      params: {
        skip: skip ?? 0,
        take: take ?? 9
      }
    });
  }

  getNovedad(id: number) {
    return this.http.get<Novedad>(this.url + `/${id}`);
  }

  postNovedades(novedad: Novedad) {
    return this.http.post<Novedad>(this.url, novedad);
  }

  putNovedad(id: number, novedad: Novedad) {
    return this.http.put(this.url + `/${id}`, novedad);
  }

  async getArchivo(url: string) {
    let archivo;

    try {
      const response = await this.http.get(url, {
        observe: 'response', responseType: 'blob'
      }).toPromise();

      archivo = URL.createObjectURL(response.body);
    } catch (error) {
      console.log(error);
    }

    return archivo;
  }

  putImagen(id: number, formData: FormData) {
    return this.http.put(this.url + "/imagen/" + id, formData);
  }

  deleteNovedad(id: number) {
    return this.http.delete(this.url + `/${id}`);
  }


}
