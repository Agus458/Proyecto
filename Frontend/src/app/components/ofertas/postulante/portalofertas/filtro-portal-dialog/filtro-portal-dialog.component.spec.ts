import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPortalDialogComponent } from './filtro-portal-dialog.component';

describe('FiltroPortalDialogComponent', () => {
  let component: FiltroPortalDialogComponent;
  let fixture: ComponentFixture<FiltroPortalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroPortalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPortalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
