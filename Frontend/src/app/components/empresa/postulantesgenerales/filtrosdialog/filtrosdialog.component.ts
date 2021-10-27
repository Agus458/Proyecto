import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PerfilService } from 'src/app/services/perfil/perfil.service';

@Component({
  selector: 'app-filtrosdialog',
  templateUrl: './filtrosdialog.component.html',
  styleUrls: ['./filtrosdialog.component.css']
})
export class FiltrosdialogComponent implements OnInit {

  filtrosForm: FormGroup;
  toppings = new FormControl();

  areas: any[] = [];

  disableSexo = new FormControl(false);
  disableEdad = new FormControl(false);
  disableDepartamento = new FormControl(false);
  disableLocalidad = new FormControl(false);
  disableAreaTematica = new FormControl(false);
  disableNivelEducativo = new FormControl(false);
  disableEstadoNivelEducativo = new FormControl(false);
  disableIdioma = new FormControl(false);
  disableRubro = new FormControl(false);
  disableTipoDocumento = new FormControl(false);
  disableAreaInteres = new FormControl(false);

  toppingList: string[] = ['Español', 'Ingles', 'Portugues'];

  constructor(
    public dialogRef: MatDialogRef<FiltrosdialogComponent>,
    public fb: FormBuilder,
    private perfilService: PerfilService,
  ) { }

  

  async ngOnInit(): Promise<void> {
    this.filtrosForm = this.fb.group({
      sexo: [''],
      edadmin: [''],
      edadmax: [''],
      departamento: [''],
      localidad: [''],
      areatematica: [''],
      niveleducativo: [''],
      estadonivedu: [''],
      idioma: [''],
      rubro: [''],
      tipodocumento: [''],
      areainteres: [''],
    });

    try {
      const areas = await this.perfilService.getData("areasTematicas").toPromise();
      this.areas = areas;
    } catch (error) {
      
    }
  }


 
}


