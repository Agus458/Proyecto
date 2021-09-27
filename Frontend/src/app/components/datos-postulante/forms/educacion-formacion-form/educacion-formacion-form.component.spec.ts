import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacionFormacionFormComponent } from './educacion-formacion-form.component';

describe('EducacionFormacionFormComponent', () => {
  let component: EducacionFormacionFormComponent;
  let fixture: ComponentFixture<EducacionFormacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducacionFormacionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducacionFormacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
