import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { proyectConfig } from "proyectConfig";
import { Novedad } from "src/app/models/novedad.model";
import { NovedadesServicesService } from "src/app/services/novedades/novedades-services.service";

@Component({
  selector: 'app-listarnovedades',
  templateUrl: './listarnovedades.component.html',
  styleUrls: ['./listarnovedades.component.css']
})

export class ListarnovedadesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'imagen', 'titulo', 'contenido', 'delete'];
  novedades: Novedad[] = [];
  error: string = "Sin Imagen";

  constructor(private novedadesservice: NovedadesServicesService) { }

  async ngOnInit() {
    try {
      const data = await this.novedadesservice.getNovedades().toPromise();
      this.novedades = data.novedades;

      for (let index = 0; index < this.novedades.length; index++) {
        const element = this.novedades[index];

        if (element.imagen) element.imagen = await this.getImagen(element.imagen);
      }
    } catch (error) {
    }
  }

  async getImagen(url: string) {
    if (url) {
      return await this.novedadesservice.getArchivo(proyectConfig.backEndURL + "/" + url);
    }

    return undefined;
  }

  delete(id: number) {
    this.novedadesservice.deleteNovedad(id).subscribe();
    window.location.reload();
  }
}

