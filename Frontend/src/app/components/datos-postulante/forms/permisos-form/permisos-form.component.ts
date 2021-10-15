import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-permisos-form',
  templateUrl: './permisos-form.component.html',
  styleUrls: ['./permisos-form.component.css']
})
export class PermisosFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  permisosForm: FormGroup = new FormGroup({});

  tiposDocumentos: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private postulantesService: PostulantesService,
    private perfilService: PerfilService
  ) { }

  async ngOnInit() {
    this.permisosForm = this.formBuilder.group({
      permisos: this.formBuilder.array([])
    })

    try {
      const tiposDocumentos = await this.perfilService.getData("tiposPermisos").toPromise();
      this.tiposDocumentos = tiposDocumentos;
    } catch (error) {

    }

    try {
      const result = await this.postulantesService.getPerfilActual().toPromise();
      if (result.permisos) {
        for (let index = 0; index < result.permisos.length; index++) {
          this.addPermiso(true);

          const entity = result.permisos[index];
          if(entity.tipoDocumento) entity.tipoDocumento = entity.tipoDocumento.id;
        }
      }

      this.permisosForm.patchValue(result);
    } catch (error) {
      
    }

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

  buscarPermiso(id: string){
    return this.tiposDocumentos.find(elem => elem.id == id);
  }

}
