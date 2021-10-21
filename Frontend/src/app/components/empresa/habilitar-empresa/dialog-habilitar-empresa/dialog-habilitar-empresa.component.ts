import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa } from 'src/app/models/empresa.model';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';

@Component({
  selector: 'app-dialog-habilitar-empresa',
  templateUrl: './dialog-habilitar-empresa.component.html',
  styleUrls: ['./dialog-habilitar-empresa.component.css']
})
export class DialogHabilitarEmpresaComponent implements OnInit {

  habilitarEmpresaForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Empresa,
    private formBuilder: FormBuilder,
    private administradoresService: AdministradorService
  ) { }

  ngOnInit(): void {
    this.habilitarEmpresaForm = this.formBuilder.group({
      fechaVencimiento: ["", [Validators.required]]
    });
  }

  submit() {
    if (this.data.id) {
      console.log(this.data);
      
      this.administradoresService.habilitarEmpresa(this.data.id, this.habilitarEmpresaForm.value).subscribe(
        ok => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
