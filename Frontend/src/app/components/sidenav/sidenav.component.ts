import { Component, Input, OnInit } from '@angular/core';
import { IsMobileService } from 'src/app/services/ismobile/is-mobile.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobile: boolean = false;

  links: { link: string; label: string; icon: string; }[] = [];

  constructor(public ismobile:IsMobileService) { }

  ngOnInit(): void {
    this.links = [
      { link: "misdatos", label: "Mis Datos", icon: "sticky_note_2"},
      { link: "nuevaoferta", label: "Nueva Oferta", icon: "sticky_note_2"},
      { link: "postularse", label: "Postularse", icon: "sticky_note_2"}
    ];
    this.ismobile.getMobile().subscribe(mobile => this.mobile=mobile);
    console.log(this.mobile);
    
  }

  
}
