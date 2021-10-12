import { Component, OnInit } from "@angular/core";
import { Novedad } from "src/app/models/novedad.model";
import { NovedadesServicesService } from "src/app/services/novedades/novedades-services.service";

@Component({
  selector: 'app-listarnovedades',
  templateUrl: './listarnovedades.component.html',
  styleUrls: ['./listarnovedades.component.css']
})

export class ListarnovedadesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'imagen', 'titulo', 'contenido', 'delete'];
  novedades : Novedad[] = [];
  error : string = "Sin Imagen";
  
  constructor(private novedadesservice: NovedadesServicesService) { }

  ngOnInit()  {
    this.novedadesservice.getNovedades().subscribe(result=> this.novedades= result.novedades);

    
  }
  
  
}

