import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDepotsComponent } from './manage-depots.component';

describe('ManageDepotsComponent', () => {
  let component: ManageDepotsComponent;
  let fixture: ComponentFixture<ManageDepotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDepotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
