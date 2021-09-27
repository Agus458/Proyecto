import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasLaboralesFormComponent } from './experiencias-laborales-form.component';

describe('ExperienciasLaboralesFormComponent', () => {
  let component: ExperienciasLaboralesFormComponent;
  let fixture: ComponentFixture<ExperienciasLaboralesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciasLaboralesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciasLaboralesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
