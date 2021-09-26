import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Caracteristique } from 'src/app/model/Caracteristique';
import { Categorie } from 'src/app/model/Categorie';
import { Vente } from 'src/app/model/Vente';
import { Produit } from 'src/app/model/Produit';
import { ProduitCaracteristiques } from 'src/app/model/ProduitCaracteristiques';
import { Unite } from 'src/app/model/Unite';
import { VenteService } from 'src/app/services/vente.service';
import { MatTableDataSource } from '@angular/material/table';
import { Offre } from 'src/app/model/Offre';

@Component({
  selector: 'app-vente-detail',
  templateUrl: './vente-detail.component.html',
  styleUrls: ['./vente-detail.component.scss']
})
export class SellDetailComponent implements OnInit {

  vente: Vente;
  caracteristiques = new MatTableDataSource<ProduitCaracteristiques>([]);
  offres = new MatTableDataSource<Offre>([]);
  displayedColumnsCaracs: string[] = ['libelle', 'unite'];
  displayedColumnsOffres: string[] = ['date', 'prix', 'statut', 'colisId'];
  form: FormGroup;
  isLoaded = false;
  loading = false;
  id: number;
  etats = ['Neuf', 'Peu utilisé', 'Dégradé'];
  statuts = ['En cours', 'Validée', 'Terminée', 'Refusée'];


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private venteService: VenteService
  ) { }


  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getVente();
  }

  async getVente(): Promise<void> {
    this.vente = await this.venteService.getVenteById(this.id);
    this.caracteristiques = new MatTableDataSource(this.vente.produit.produitCaracteristiques);
    this.offres = new MatTableDataSource(this.vente.offres);
    console.log(this.vente);
    this.isLoaded = true;

    this.form = this.formBuilder.group({
      etat: [this.vente.produit.etat],
      statut: [this.vente.statut]
    });
  }

  onSubmit(): any{
    console.log(this.form);
  }

}
