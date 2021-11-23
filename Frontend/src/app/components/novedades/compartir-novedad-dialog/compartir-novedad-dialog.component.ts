import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Novedad } from 'src/app/models/novedad.model';
import { Oferta } from 'src/app/models/oferta.model';


@Component({
  selector: 'app-compartir-novedad-dialog',
  templateUrl: './compartir-novedad-dialog.component.html',
  styleUrls: ['./compartir-novedad-dialog.component.css']
})
export class CompartirNovedadDialogComponent implements OnInit {

  tipo: string;
  titulo: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.tipo= this.data.class.titulo? 'novedad': 'oferta';
    this.titulo= this.data.class.titulo? this.data.class.titulo: this.data.class.nombreOfferta;
    
  }

}
