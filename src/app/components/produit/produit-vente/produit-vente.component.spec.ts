import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellFormComponent } from './produit-vente.component';

describe('SellFormComponent', () => {
  let component: SellFormComponent;
  let fixture: ComponentFixture<SellFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
