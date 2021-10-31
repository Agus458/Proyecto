import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersEmpresaDialogComponent } from './filters-empresa-dialog.component';

describe('FiltersEmpresaDialogComponent', () => {
  let component: FiltersEmpresaDialogComponent;
  let fixture: ComponentFixture<FiltersEmpresaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersEmpresaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersEmpresaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
