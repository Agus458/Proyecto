import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisofertasempresaComponent } from './misofertasempresa.component';

describe('MisofertasempresaComponent', () => {
  let component: MisofertasempresaComponent;
  let fixture: ComponentFixture<MisofertasempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisofertasempresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisofertasempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
