import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-compartir-novedad-dialog',
  templateUrl: './compartir-novedad-dialog.component.html',
  styleUrls: ['./compartir-novedad-dialog.component.css']
})
export class CompartirNovedadDialogComponent implements OnInit {

  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
