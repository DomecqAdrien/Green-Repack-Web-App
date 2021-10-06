import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categorie } from 'src/app/model/Categorie';
import { PrixVente } from 'src/app/model/PrixVente';
import { ProduitService } from 'src/app/services/produit.service';
import { CreatePrixComponent } from '../../dialog/create-prix/create-prix.component';

@Component({
  selector: 'app-manage-prix',
  templateUrl: './manage-prix.component.html',
  styleUrls: ['./manage-prix.component.scss']
})
export class ManagePrixComponent implements OnInit {

  @Input() categories: Categorie[];
  prixVente: PrixVente[] = [];
  dataSource = new MatTableDataSource<PrixVente>([]);
  displayedColumns = ['categorie', 'titre', 'prix'];

  constructor(
    private dialog: MatDialog,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    this.getPrix();
  }

  async getPrix(): Promise<any> {
    this.prixVente = await this.produitService.getPrixProduits();
    for (const prix of this.prixVente) {
      prix.categorie = this.categories.filter(cat => cat.id === prix.categorieId)[0].libelle;
    }
    console.log(this.prixVente);
    this.dataSource = new MatTableDataSource(this.prixVente);
  }

  selectCategory(event) {
    
  }

  async addPrixVente(): Promise<void> {
    const prixVente = await this.dialog.open(CreatePrixComponent, {
      width: '30%',
      height: '45%',
      data: {
        categories: this.categories
      }
    }).afterClosed().toPromise();
    if (prixVente !== undefined) {
      //console.log(prixVente)
      const prixVenteToCreate = new PrixVente();
      prixVenteToCreate.titre = prixVente.titre;
      prixVenteToCreate.categorieId = +prixVente.categorie;
      prixVenteToCreate.prix = prixVente.prix;
      console.log(prixVenteToCreate);
      const aa = await this.produitService.createPrixVente(prixVenteToCreate);
      console.log(aa);
      this.getPrix();
    }
  }

}
