import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarnovedadesComponent } from './agregarnovedades.component';

describe('AgregarnovedadesComponent', () => {
  let component: AgregarnovedadesComponent;
  let fixture: ComponentFixture<AgregarnovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarnovedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarnovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
