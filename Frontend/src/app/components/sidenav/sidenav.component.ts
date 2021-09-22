import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() mobile: boolean = false;
  links: { link: string; label: string; icon: string; }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.links = [
      { link: "misdatos", label: "Mis Datos", icon: "sticky_note_2"},
      { link: "home", label: "Home", icon: "home" },
      { link: "home", label: "Home", icon: "home" }
    ]
  }

}
