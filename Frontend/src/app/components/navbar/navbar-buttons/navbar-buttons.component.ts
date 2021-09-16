import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar-buttons',
  templateUrl: './navbar-buttons.component.html',
  styleUrls: ['./navbar-buttons.component.css']
})
export class NavbarButtonsComponent implements OnInit {

  @Output() cerrarSesionEvent: EventEmitter<any> = new EventEmitter();
  @Input() logeado: boolean = false;
  @Input() usuario: Usuario | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    this.cerrarSesionEvent.emit();
  }

}
