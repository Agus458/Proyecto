import { Component, OnInit } from "@angular/core";

export interface PeriodicElement {
  id: number;
  name: string;
  titulo: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'https://images.alphacoders.com/943/thumb-1920-943148.jpg', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",},
  {id: 2, name: 'Helium', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: 'He'},
  {id: 3, name: 'Lithium', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: 'Li'},
  {id: 4, name: 'Beryllium', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: 'Be'},
  {id: 5, name: 'Boron', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: 'B'},
  {id: 6, name: 'Carbon', titulo: "Titulo", symbol: 'C'},
  {id: 7, name: 'Nitrogen', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: 'N'},
  {id: 8, name: 'Oxygen', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: 'O'},
  {id: 9, name: 'Fluorine', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: 'F'},
  {id: 10, name: 'Neon', titulo: "Titulo de la Novedad Pero Bien Largo", symbol: 'Ne'},
];

@Component({
  selector: 'app-listarnovedades',
  templateUrl: './listarnovedades.component.html',
  styleUrls: ['./listarnovedades.component.css']
})

export class ListarnovedadesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'titulo', 'symbol', 'delete'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }
  
  
  
}

