import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departamento } from 'src/app/models/departamento.model';
import { Localidad } from 'src/app/models/localidad.model';
import { DepartamentosService } from 'src/app/services/departamentos/departamentos.service';
import { LocalidadesService } from 'src/app/services/localidades/localidades.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';

@Component({
  selector: 'app-filtrosdialog',
  templateUrl: './filtrosdialog.component.html',
  styleUrls: ['./filtrosdialog.component.css']
})
export class FiltrosdialogComponent implements OnInit {

  filtrosForm: FormGroup;
  toppings = new FormControl();

  departamentos: Departamento[] = [];
  selectedDepartamento: number | undefined;

  localidades: Localidad[] = [];

  areas: any[] = [];
  idiomas: any[] = [];
  estados: any[] = [];
  nivelesEducativos: any[] = [];
  tiposDocumentos: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FiltrosdialogComponent>,
    public fb: FormBuilder,
    private perfilService: PerfilService,
    private departamentosService: DepartamentosService,
    private localidadesService: LocalidadesService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.departamentosService.getByPais(1).subscribe(
      result => {
        this.departamentos = result;
      }
    );

    const edad = this.fb.group({
      edadmin: ['', [Validators.required]],
      edadmax: ['', [Validators.required]],
    });

    edad.disable();

    this.filtrosForm = this.fb.group({
      sexo: [{ value: '', disabled: true }, [Validators.required]],
      edad,
      departamento: [{ value: '', disabled: true }, [Validators.required]],
      localidad: [{ value: '', disabled: true }, [Validators.required]],
      areaTematica: [{ value: '', disabled: true }, [Validators.required]],
      nivelEducativo: [{ value: '', disabled: true }, [Validators.required]],
      estadoNivelEducativo: [{ value: '', disabled: true }, [Validators.required]],
      idioma: [{ value: '', disabled: true }, [Validators.required]],
      rubro: [{ value: '', disabled: true }, [Validators.required]],
      tipoDocumento: [{ value: '', disabled: true }, [Validators.required]],
      areasInteres: [{ value: '', disabled: true }, [Validators.required]],
    });

    this.filtrosForm.patchValue(this.data);

    try {
      const nivelesEducativos = await this.perfilService.getData("nivelesEducativos").toPromise();
      this.nivelesEducativos = nivelesEducativos;

      const estados = await this.perfilService.getData("estados").toPromise();
      this.estados = estados;

      const idiomas = await this.perfilService.getData("nombresIdiomas").toPromise();
      this.idiomas = idiomas;

      const areasTematicas = await this.perfilService.getData("areasTematicas").toPromise();
      this.areas = areasTematicas;

      const tiposDocumentos = await this.perfilService.getData("tiposPermisos").toPromise();
      this.tiposDocumentos = tiposDocumentos;
    } catch (error) {
      console.log(error);
    }

    this.onChangeDepartamento();
  }

  toggle(control: string) {
    if (this.filtrosForm.controls[control].disabled) {
      this.filtrosForm.controls[control].enable();
    } else {
      this.filtrosForm.controls[control].disable();
    }
  }

  onChangeDepartamento(): void {
    this.selectedDepartamento = this.filtrosForm.get("departamento")?.value;

    if (this.selectedDepartamento) {
      this.localidadesService.getByDepartamento(this.selectedDepartamento).subscribe(
        result => {
          this.localidades = result;
        }
      );
    }
  }

}


