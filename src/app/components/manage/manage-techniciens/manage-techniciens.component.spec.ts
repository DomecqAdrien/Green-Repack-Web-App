import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTechniciensComponent } from './manage-techniciens.component';

describe('ManageTechniciensComponent', () => {
  let component: ManageTechniciensComponent;
  let fixture: ComponentFixture<ManageTechniciensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTechniciensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTechniciensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
