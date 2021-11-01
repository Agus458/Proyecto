import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalofertasComponent } from './portalofertas.component';

describe('PortalofertasComponent', () => {
  let component: PortalofertasComponent;
  let fixture: ComponentFixture<PortalofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalofertasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
