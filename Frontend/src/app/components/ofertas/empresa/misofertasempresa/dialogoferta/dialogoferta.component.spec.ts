import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogofertaComponent } from './dialogoferta.component';

describe('DialogofertaComponent', () => {
  let component: DialogofertaComponent;
  let fixture: ComponentFixture<DialogofertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogofertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
