import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarnovedadesComponent } from './listarnovedades.component';

describe('ListarnovedadesComponent', () => {
  let component: ListarnovedadesComponent;
  let fixture: ComponentFixture<ListarnovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarnovedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarnovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
