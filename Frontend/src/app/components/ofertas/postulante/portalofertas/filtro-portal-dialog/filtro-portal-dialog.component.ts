import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilService } from 'src/app/services/perfil/perfil.service';

@Component({
  selector: 'app-filtro-portal-dialog',
  templateUrl: './filtro-portal-dialog.component.html',
  styleUrls: ['./filtro-portal-dialog.component.css']
})
export class FiltroPortalDialogComponent implements OnInit {

  filtrosForm: FormGroup;

  areas: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FiltroPortalDialogComponent>,
    public fb: FormBuilder,
    private perfilService: PerfilService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.filtrosForm = this.fb.group({
      areaDeTrabajo: [{ value: '', disabled: true }, [Validators.required]],
    });

    try {
      const areasTematicas = await this.perfilService.getData("areasTematicas").toPromise();
      this.areas = areasTematicas;
    } catch (error) {
      
    }

    this.filtrosForm.patchValue(this.data);
  }

  toggle(control: string) {
    if (this.filtrosForm.controls[control].disabled) {
      this.filtrosForm.controls[control].enable();
    } else {
      this.filtrosForm.controls[control].disable();
    }
  }

}
