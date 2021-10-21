import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabilitarEmpresaComponent } from './dialog-habilitar-empresa.component';

describe('DialogHabilitarEmpresaComponent', () => {
  let component: DialogHabilitarEmpresaComponent;
  let fixture: ComponentFixture<DialogHabilitarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHabilitarEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHabilitarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
