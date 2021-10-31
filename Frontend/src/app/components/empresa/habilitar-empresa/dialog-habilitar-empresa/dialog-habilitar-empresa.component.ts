import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
    private administradoresService: AdministradorService
  ) { }

  ngOnInit(): void {
    this.habilitarEmpresaForm = this.formBuilder.group({
      fechaVencimiento: [this.data.vencimiento ?? "", [Validators.required]]
    });

    if (this.data.estado != 2) {
      this.habilitarEmpresaForm.disable();
    }
  }

  submit() {
    if (this.data.id) {
      console.log(this.data);

      this.administradoresService.habilitarEmpresa(this.data.id, this.habilitarEmpresaForm.value).subscribe(
        ok => {
          this.snackBar.open("Empresa Habilitada Correctamente", "Cerrar", { duration: 5000 });
          window.location.reload();
        },
        error => {
          this.snackBar.open(error.error.message  ?? "Algo salio Mal", "Close", { duration: 5000 });
        }
      );
    }
  }

  deshabilitarEmpresa() {
    if (this.data.id) {
      this.administradoresService.deshabilitarEmpresa(this.data.id).subscribe(
        ok => {
          this.snackBar.open("Empresa Deshabilitada Correctamente", "Cerrar", { duration: 5000 });
          window.location.reload();
        },
        error => {
          this.snackBar.open(error.error.message ?? "Algo salio Mal", "Close", { duration: 5000 });
        }
      );
    }
  }
}
