import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCaracteristiquesComponent } from './manage-caracteristiques.component';

describe('ManageCaracteristiquesComponent', () => {
  let component: ManageCaracteristiquesComponent;
  let fixture: ComponentFixture<ManageCaracteristiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCaracteristiquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCaracteristiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
