import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosdialogComponent } from './filtrosdialog.component';

describe('FiltrosdialogComponent', () => {
  let component: FiltrosdialogComponent;
  let fixture: ComponentFixture<FiltrosdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
