import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioempresaComponent } from './usuarioempresa.component';

describe('UsuarioempresaComponent', () => {
  let component: UsuarioempresaComponent;
  let fixture: ComponentFixture<UsuarioempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioempresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
