import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experiencias-laborales-form',
  templateUrl: './experiencias-laborales-form.component.html',
  styleUrls: ['./experiencias-laborales-form.component.css']
})
export class ExperienciasLaboralesFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  experienciasLaboralesForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
