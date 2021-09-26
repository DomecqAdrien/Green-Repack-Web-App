import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePrixComponent } from './manage-prix.component';

describe('ManagePrixComponent', () => {
  let component: ManagePrixComponent;
  let fixture: ComponentFixture<ManagePrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
