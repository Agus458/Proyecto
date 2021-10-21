import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarEmpresaComponent } from './habilitar-empresa.component';

describe('HabilitarEmpresaComponent', () => {
  let component: HabilitarEmpresaComponent;
  let fixture: ComponentFixture<HabilitarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilitarEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
