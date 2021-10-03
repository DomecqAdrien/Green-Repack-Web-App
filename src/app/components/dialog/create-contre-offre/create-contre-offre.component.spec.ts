import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContreOffreComponent } from './create-contre-offre.component';

describe('CreateContreOffreComponent', () => {
  let component: CreateContreOffreComponent;
  let fixture: ComponentFixture<CreateContreOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContreOffreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContreOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
