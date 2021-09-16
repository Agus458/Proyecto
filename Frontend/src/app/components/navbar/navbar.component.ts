import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() showSidenavEvent = new EventEmitter();
  @Input() mobile: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  showSidenav(): void {
    this.showSidenavEvent.emit();
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
  }
}
