import { Component, Input, OnInit } from '@angular/core';
import { IsMobileService } from 'src/app/services/ismobile/is-mobile.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {

  constructor(public ismobile: IsMobileService) { }

  ngOnInit(): void {
  }

}
