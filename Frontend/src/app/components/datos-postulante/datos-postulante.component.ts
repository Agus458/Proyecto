import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-datos-postulante',
  templateUrl: './datos-postulante.component.html',
  styleUrls: ['./datos-postulante.component.css']
})
export class DatosPostulanteComponent implements OnInit {

  datospersonalesGroup: FormGroup = new FormGroup({});
  educacionformacionGroup: FormGroup = new FormGroup({});
  experiencialaboralGroup: FormGroup = new FormGroup({});
  permisosGroup: FormGroup = new FormGroup({});
  interesesGroup: FormGroup = new FormGroup({});
  cvGroup: FormGroup = new FormGroup({});

  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.datospersonalesGroup = this._formBuilder.group({
      numerodocumento: ['', Validators.required],
      primernombre: ['', Validators.required],
      primerapellido: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      celular: ['', Validators.required],
      correoelectronico: ['', Validators.required],
    });
    this.educacionformacionGroup = this._formBuilder.group({
      nombrecurso: ['', Validators.required],
    });
    this.experiencialaboralGroup = this._formBuilder.group({

    });
    this.permisosGroup = this._formBuilder.group({

    });
    this.interesesGroup = this._formBuilder.group({

    });
    this.cvGroup = this._formBuilder.group({

    });
  }

  task: Task = {
    name: 'Indiferente',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Completa', completed: false, color: 'primary'},
      {name: 'Medio Turno Mañana', completed: false, color: 'primary'},
      {name: 'Medio Turno Tarde', completed: false, color: 'primary'},
      {name: 'Medio Turno Noche', completed: false, color: 'primary'}
    ]
  };

  allComplete: boolean = false;

}





