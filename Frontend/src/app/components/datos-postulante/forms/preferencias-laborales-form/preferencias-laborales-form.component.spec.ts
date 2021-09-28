import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciasLaboralesFormComponent } from './preferencias-laborales-form.component';

describe('PreferenciasLaboralesFormComponent', () => {
  let component: PreferenciasLaboralesFormComponent;
  let fixture: ComponentFixture<PreferenciasLaboralesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciasLaboralesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenciasLaboralesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
