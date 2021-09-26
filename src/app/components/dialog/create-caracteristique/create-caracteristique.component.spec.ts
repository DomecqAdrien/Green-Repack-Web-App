import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaracteristiqueComponent } from './create-caracteristique.component';

describe('CreateCaracteristiqueComponent', () => {
  let component: CreateCaracteristiqueComponent;
  let fixture: ComponentFixture<CreateCaracteristiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCaracteristiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaracteristiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
