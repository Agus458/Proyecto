import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filters-empresa-dialog',
  templateUrl: './filters-empresa-dialog.component.html',
  styleUrls: ['./filters-empresa-dialog.component.css']
})
export class FiltersEmpresaDialogComponent implements OnInit {

  filtrosForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FiltersEmpresaDialogComponent>,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.filtrosForm = this.fb.group({
      estado: [{ value: '', disabled: true }, [Validators.required]],
    });

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
