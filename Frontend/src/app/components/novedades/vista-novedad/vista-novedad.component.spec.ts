import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaNovedadComponent } from './vista-novedad.component';

describe('VistaNovedadComponent', () => {
  let component: VistaNovedadComponent;
  let fixture: ComponentFixture<VistaNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaNovedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
