import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentesAnnuleesComponent } from './ventes-annulees.component';

describe('VentesAnnuleesComponent', () => {
  let component: VentesAnnuleesComponent;
  let fixture: ComponentFixture<VentesAnnuleesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentesAnnuleesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentesAnnuleesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
