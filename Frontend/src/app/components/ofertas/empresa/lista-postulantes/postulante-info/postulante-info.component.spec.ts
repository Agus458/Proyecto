import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteInfoComponent } from './postulante-info.component';

describe('PostulanteInfoComponent', () => {
  let component: PostulanteInfoComponent;
  let fixture: ComponentFixture<PostulanteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulanteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulanteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
