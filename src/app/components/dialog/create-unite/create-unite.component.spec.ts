import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUniteComponent } from './create-unite.component';

describe('CreateUniteComponent', () => {
  let component: CreateUniteComponent;
  let fixture: ComponentFixture<CreateUniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
