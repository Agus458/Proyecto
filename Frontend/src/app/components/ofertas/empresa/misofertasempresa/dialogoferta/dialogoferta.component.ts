import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Oferta } from 'src/app/models/oferta.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dialogoferta',
  templateUrl: './dialogoferta.component.html',
  styleUrls: ['./dialogoferta.component.css']
})
export class DialogofertaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Oferta,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
