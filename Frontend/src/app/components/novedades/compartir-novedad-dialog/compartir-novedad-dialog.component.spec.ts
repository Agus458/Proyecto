import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirNovedadDialogComponent } from './compartir-novedad-dialog.component';

describe('CompartirNovedadDialogComponent', () => {
  let component: CompartirNovedadDialogComponent;
  let fixture: ComponentFixture<CompartirNovedadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompartirNovedadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirNovedadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
