import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogofertaComponent } from './dialogoferta/dialogoferta.component';

@Component({
  selector: 'app-misofertasempresa',
  templateUrl: './misofertasempresa.component.html',
  styleUrls: ['./misofertasempresa.component.css']
})
export class MisofertasempresaComponent implements OnInit {

  displayedColumns: string[] = ['puesto', 'fechaPublicacion', 'fechaCierre', 'vacio1', 'mas'];
 
  
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogofertaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async ngOnInit() {
    
    }
  

    delete(id: number) {
    }
}
