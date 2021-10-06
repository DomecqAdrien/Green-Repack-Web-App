import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteEnAttenteProduitComponent } from './vente-en-attente-produit.component';

describe('VenteEnAttenteProduitComponent', () => {
  let component: VenteEnAttenteProduitComponent;
  let fixture: ComponentFixture<VenteEnAttenteProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteEnAttenteProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteEnAttenteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
