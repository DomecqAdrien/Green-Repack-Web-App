import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechnicienComponent } from './create-technicien.component';

describe('CreateTechnicienComponent', () => {
  let component: CreateTechnicienComponent;
  let fixture: ComponentFixture<CreateTechnicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTechnicienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
