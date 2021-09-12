import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCompletedComponent } from './sell-completed.component';

describe('SellCompletedComponent', () => {
  let component: SellCompletedComponent;
  let fixture: ComponentFixture<SellCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
