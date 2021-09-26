import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Categorie } from 'src/app/model/Categorie';
import { PrixVente } from 'src/app/model/PrixVente';
import { ProduitService } from 'src/app/services/produit.service';

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

}
