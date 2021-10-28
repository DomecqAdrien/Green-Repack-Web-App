import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/model/Produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-depot-details',
  templateUrl: './depot-details.component.html',
  styleUrls: ['./depot-details.component.scss']
})
export class DepotDetailsComponent implements OnInit {

  id: Number;
  dataSource = new MatTableDataSource<Produit>([]);
  produits: Produit[] = [];
  displayedColumns = ['titre', 'etat', 'statut'];
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProduits();
  }

  async getProduits(): Promise<any>{
    this.produits = await this.produitService.getProduitsByDepot(this.id)
    this.dataSource = new MatTableDataSource(this.produits);
    this.isLoaded = true;
  }

}
