import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantesgeneralesComponent } from './postulantesgenerales.component';

describe('PostulantesgeneralesComponent', () => {
  let component: PostulantesgeneralesComponent;
  let fixture: ComponentFixture<PostulantesgeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulantesgeneralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulantesgeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
