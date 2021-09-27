import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonalesFormComponent } from './datos-personales-form.component';

describe('DatosPersonalesFormComponent', () => {
  let component: DatosPersonalesFormComponent;
  let fixture: ComponentFixture<DatosPersonalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPersonalesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPersonalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
