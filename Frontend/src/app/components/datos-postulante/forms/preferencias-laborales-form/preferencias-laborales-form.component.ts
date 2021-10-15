import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-preferencias-laborales-form',
  templateUrl: './preferencias-laborales-form.component.html',
  styleUrls: ['./preferencias-laborales-form.component.css']
})
export class PreferenciasLaboralesFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  preferenciasLaboralesForm: FormGroup = new FormGroup({});

  areas: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private postulantesService: PostulantesService,
    private perfilService: PerfilService
  ) { }

  async ngOnInit() {
    this.preferenciasLaboralesForm = this.formBuilder.group({
      jornadaIndiferente: [false],
      jornadaCompleta: [false],
      jornadaManiana: [false],
      jornadaTarde: [false],
      jornadaNoche: [false],
      preferenciasLaborales: this.formBuilder.array([])
    })

    try {
      const areas = await this.perfilService.getData("areasTematicas").toPromise();
      this.areas = areas;
    } catch (error) {
      
    }

    try {
      const result = await this.postulantesService.getPerfilActual().toPromise();

      if (result.preferenciasLaborales) {
        for (let index = 0; index < result.preferenciasLaborales.length; index++) {
          this.addPreferenciaLaboral(true);

          const entity = result.preferenciasLaborales[index];
          if(entity.areasInteres) entity.areasInteres = entity.areasInteres.id;
        }
      }

      this.preferenciasLaboralesForm.patchValue(result);

    } catch (error) {

    }


    this.formReady.emit(this.preferenciasLaboralesForm);
  }

  get preferenciasLaborales(): FormArray {
    return this.preferenciasLaboralesForm.get("preferenciasLaborales") as FormArray;
  }

  addPreferenciaLaboral(id: boolean) {
    const preferenciaLaboral = this.formBuilder.group({
      puestoPreferido: ['', [Validators.required]],
      areasInteres: ['', [Validators.required]],
      aspiracionSalarial: ['', [Validators.required]]
    });

    if (id) preferenciaLaboral.addControl("id", new FormControl('', [Validators.required]));

    this.preferenciasLaborales.push(preferenciaLaboral);
  }

  deletePreferenciaLaboral(index: number) {
    const id = this.preferenciasLaborales.at(index).get("id");
    if (id) {
      this.postulantesService.deletePermiso(id.value).subscribe();
    }

    this.preferenciasLaborales.removeAt(index);
  }

}
