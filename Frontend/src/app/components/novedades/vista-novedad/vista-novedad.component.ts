import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { proyectConfig } from 'proyectConfig';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadesServicesService } from 'src/app/services/novedades/novedades-services.service';
import { CompartirNovedadDialogComponent } from '../compartir-novedad-dialog/compartir-novedad-dialog.component';


@Component({
  selector: 'app-vista-novedad',
  templateUrl: './vista-novedad.component.html',
  styleUrls: ['./vista-novedad.component.css']
})
export class VistaNovedadComponent implements OnInit {
  
  novedad: Novedad | undefined;

  constructor(private novedadesservice: NovedadesServicesService, private dialog: MatDialog, private route: ActivatedRoute) { }

  async ngOnInit() {
    const routparams= this.route.snapshot.paramMap;
    const id= Number(routparams.get("id"));
    if (id) {
    try {
      const data = await this.novedadesservice.getNovedad(id).toPromise();
      this.novedad = data;

      if (this.novedad.imagen) this.novedad.imagen = await this.getImagen(this.novedad.imagen);
      
    } catch (error) {

    }
  }
  }

  async getImagen(url: string) {
    if (url) {
      return await this.novedadesservice.getArchivo(proyectConfig.backEndURL + "/" + url);
    }

    return undefined;
  }

  compartir(): void {
    this.dialog.open(CompartirNovedadDialogComponent);
  }


}
