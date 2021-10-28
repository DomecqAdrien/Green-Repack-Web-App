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
import { CreateContreOffreComponent } from 'src/app/components/dialog/create-contre-offre/create-contre-offre.component';
import { PrixVente } from 'src/app/model/PrixVente';
import { MatDialog } from '@angular/material/dialog';
import { OffreService } from 'src/app/services/offre.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-vente-detail',
  templateUrl: './vente-detail.component.html',
  styleUrls: ['./vente-detail.component.scss']
})
export class SellDetailComponent implements OnInit {

  vente: Vente;
  prixVente: PrixVente;
  caracteristiques = new MatTableDataSource<ProduitCaracteristiques>([]);
  offres = new MatTableDataSource<Offre>([]);
  displayedColumnsCaracs: string[] = ['libelle', 'unite'];
  displayedColumnsOffres: string[] = ['date', 'prix', 'statut', 'colisId'];
  form: FormGroup;
  isLoaded = false;
  loading = false;
  id: number;
  etats = ['Neuf', 'Peu utilisé', 'Dégradé'];
  statuts = ['En cours', 'En attente de produit' , 'Accepté', 'Refusé'];


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private venteService: VenteService,
    private offreService: OffreService,
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService
  ) { }


  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getVente();
  }

  async getVente(): Promise<void> {
    this.vente = await this.venteService.getVenteById(this.id);
    this.caracteristiques = new MatTableDataSource(this.vente.produit.produitCaracteristiques);
    this.offres = new MatTableDataSource(this.vente.offres);
    this.isLoaded = true;

    this.form = this.formBuilder.group({
      etat: [this.vente.produit.etat],
      statut: [this.vente.statut]
    });
  }

  async onSubmit(): Promise<any>{
    const statut = this.form.value.statut;
    if (statut === 'Accepté' || statut === 'Refusé'){
      const lastOffer = this.vente.offres[this.vente.offres.length - 1];
      await this.venteService.validateVente(this.id, lastOffer.id, statut);
      this.router.navigate(['/manage/ventes']);
    }
  }

  downloadColissimo(): any {
    // TODO: file download
  }


  async createContreOffre(): Promise<void> {
    this.prixVente = await this.offreService.getPrixVenteByTitre(this.vente.produit.titre);
    const prix = await this.dialog.open(CreateContreOffreComponent, {
      width: '30%',
      height: '33%',
      data: {
        prix: this.prixVente
      }
    }).afterClosed().toPromise();
    if (prix !== undefined) {
      const a = await this.offreService.createContreOffre(this.id, prix);
      this.alertService.success('Votre offre a bien été soumise');
    }
  }

}
