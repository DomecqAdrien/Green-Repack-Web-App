import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrixComponent } from './create-prix.component';

describe('CreatePrixComponent', () => {
  let component: CreatePrixComponent;
  let fixture: ComponentFixture<CreatePrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
