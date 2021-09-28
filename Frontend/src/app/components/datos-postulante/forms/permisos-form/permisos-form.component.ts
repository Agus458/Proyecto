import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-permisos-form',
  templateUrl: './permisos-form.component.html',
  styleUrls: ['./permisos-form.component.css']
})
export class PermisosFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  permisosForm: FormGroup = new FormGroup({});

  tiposDocumentos = [
    "Carné de salud", "Carné Cuida Coches", "Carné de Aplicación de productos fitosanitarios", "Carné de clasificador", "Carné de Foguista", "Carné de Manipulación de alimentos", "Libreta de conducir Cat. A", "Libreta de conducir Cat. B", "Libreta de conducir Cat. C", "Libreta de conducir Cat. D", "Libreta de conducir Cat. E", "Libreta de conducir Cat. F", "Libreta de conducir Cat. G1", "Libreta de conducir Cat. G2", "Libreta de conducir Cat. G3", "Libreta de conducir Cat. H", "Porte de armas", "Otro"
  ]

  constructor(
    private formBuilder: FormBuilder,
    private postulantesService: PostulantesService
  ) { }

  ngOnInit(): void {
    this.permisosForm = this.formBuilder.group({
      permisos: this.formBuilder.array([])
    })

    this.postulantesService.getPerfilActual().subscribe(
      result => {
        if (result.permisos) {
          for (let index = 0; index < result.permisos.length; index++) {
            this.addPermiso(true);
          }
        }

        this.permisosForm.patchValue(result);
      },
      error => {
        console.log(error);
      }
    );

    this.formReady.emit(this.permisosForm);
  }

  get permisos(): FormArray {
    return this.permisosForm.get("permisos") as FormArray;
  }

  addPermiso(id: boolean) {
    const permiso = this.formBuilder.group({
      tipoDocumento: ['', [Validators.required]],
      vigencia: ['', [Validators.required]],
      especificacion: ['']
    });

    if (id) permiso.addControl("id", new FormControl('', [Validators.required]));

    this.permisos.push(permiso);
  }

  deletePermiso(index: number) {
    const id = this.permisos.at(index).get("id");
    if (id) {
      this.postulantesService.deletePermiso(id.value).subscribe();
    }

    this.permisos.removeAt(index);
  }

  onChangeTipoDocumento(index: number) {
    const permiso = this.permisos.at(index) as FormGroup;

    if (permiso) {
      if (permiso.get("tipoDocumento")?.value == "Otro") {
        permiso.addControl("especificacion", new FormControl('', [Validators.required]));
      } else {
        permiso.removeControl("especificacion");
      }

    }
  }

  getTipoDocumento(index: number) {
    return this.permisos.at(index).get("tipoDocumento")?.value;
  }

}
