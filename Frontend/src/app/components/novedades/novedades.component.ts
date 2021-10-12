import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadesServicesService } from 'src/app/services/novedades/novedades-services.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  novedades : Novedad[] = [];
  
  constructor(private novedadesservice: NovedadesServicesService) { }

  ngOnInit()  {
    this.novedadesservice.getNovedades().subscribe(result=> this.novedades= result.novedades);

    
  }

}
