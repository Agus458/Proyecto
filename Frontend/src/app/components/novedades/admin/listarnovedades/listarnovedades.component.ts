import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
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

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['id', 'imagen', 'titulo', 'fechaPublicacion', 'vacio1', 'delete', 'edit'];
  novedades: Novedad[] = [];
  error: string = "Sin Imagen";

  constructor(private novedadesservice: NovedadesServicesService) { }

  async ngOnInit() {
    await this.getNovedades(0, this.pageSize);
  }
  async getNovedades(skip: number, take: number) {
    try {
      const data = await this.novedadesservice.getNovedades(skip, take).toPromise();
      this.novedades = data.novedades;
      this.length = data.cantidad;

      for (let index = 0; index < this.novedades.length; index++) {
        const element = this.novedades[index];

        if (element.imagen) element.imagen = await this.getImagen(element.imagen);
      }
    } catch (error) {
    }
  }

  async paginatorChange(event?: PageEvent) {
    if (event) {
      const skip = event.pageIndex * event.pageSize;
      await this.getNovedades(skip, event.pageSize);
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

