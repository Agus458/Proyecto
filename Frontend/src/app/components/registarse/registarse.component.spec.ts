import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarseComponent } from './registarse.component';

describe('RegistarseComponent', () => {
  let component: RegistarseComponent;
  let fixture: ComponentFixture<RegistarseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistarseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
