import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { proyectConfig } from 'proyectConfig';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-cvform',
  templateUrl: './cvform.component.html',
  styleUrls: ['./cvform.component.css']
})
export class CVFormComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  cvForm: FormGroup = new FormGroup({});

  cv: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private postulantesService: PostulantesService
  ) { }

  async ngOnInit() {
    this.cvForm = this.formBuilder.group({
      cvPerfil: [''],
      perfilPublico: [{ value: false }, [Validators.required]],
      aceptaTerminos: [{ value: false }, [Validators.required]]
    })

    try {
      const result = await this.postulantesService.getPerfilActual().toPromise();

      this.cvForm.patchValue(result);
      if (result.cv) {
        this.cv = await this.postulantesService.getArchivo(proyectConfig.backEndURL + "/" + result.cv);
      }

    } catch (error) { }

    this.formReady.emit(this.cvForm);
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cvForm.get('cvPerfil')?.setValue(file);
    }
  }

}
