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
    
  }

}
