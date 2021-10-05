import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerContraseniaComponent } from './restablecer-contrasenia.component';

describe('RestablecerContraseniaComponent', () => {
  let component: RestablecerContraseniaComponent;
  let fixture: ComponentFixture<RestablecerContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecerContraseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecerContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
