import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEmpresaComponent } from './confirmar-empresa.component';

describe('ConfirmarEmpresaComponent', () => {
  let component: ConfirmarEmpresaComponent;
  let fixture: ComponentFixture<ConfirmarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
