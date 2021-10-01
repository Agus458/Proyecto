import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IsMobileService } from 'src/app/services/ismobile/is-mobile.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobile: boolean = false;

  links: { link: string; label: string; icon: string; }[] = [];

  constructor(
    public ismobile: IsMobileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.links = [
      { link: "novedades", label: "Novedades", icon: "sticky_note_2" }
    ];

    const usuario = this.authService.getUser()
    if (usuario) {
      if (usuario.tipo == "Postulante") {
        this.links.push(
          { link: "misdatos", label: "Mis Datos", icon: "sticky_note_2" },
          { link: "postularse", label: "Postularse", icon: "sticky_note_2" }
        );
      } else if (usuario.tipo == "Empresa") {
        this.links.push(
          { link: "nuevaoferta", label: "Nueva Oferta", icon: "sticky_note_2" }
        );
      } else {

      }
    }
  }

}
