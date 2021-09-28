import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVFormComponent } from './cvform.component';

describe('CVFormComponent', () => {
  let component: CVFormComponent;
  let fixture: ComponentFixture<CVFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CVFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CVFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
