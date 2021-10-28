import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/model/Categorie';
import { Produit } from 'src/app/model/Produit';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-product-liste',
  templateUrl: './product-liste.component.html',
  styleUrls: ['./product-liste.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource = new MatTableDataSource<Produit>([]);

  produits: Observable<Produit[]>;
  produitsSource = [];
  filters: Filter = null;


  categories = [];
  etats = ['Neuf', 'Peu utilisé', 'Dégradé'];
  filterForm: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
    this.getProduits();
    this.initFilterForm();
  }

  async getProduits(): Promise<any> {
    this.categories = await this.produitService.getCategories();
    const produits: Produit[] = await this.produitService.getSellableProduits();
    produits.forEach(produit => {
      this.produitsSource.push(produit);
      this.updateDataSource(this.produitsSource);
    });
    this.produits = this.dataSource.connect();

  }

  updateDataSource(dataSource: Produit[]): any{
    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property){
        case 'categorie': return item.categorieId;
        case 'etat': return item.etat;
        default: return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
  }

  initFilterForm(): void {
    this.filterForm = this.formBuilder.group({
      etat: new FormControl(),
      categorie: new FormControl()
    });
  }

  onFilter(): void {
    this.filters = {
      etat: this.filterForm.get('etat').value,
      categorie: this.filterForm.get('categorie').value
    };

    const filteredList = this.filterProductList();
    this.dataSource = new MatTableDataSource(filteredList);
    this.dataSource.paginator = this.paginator;
    this.produits = this.dataSource.connect();
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filters = null;
  }

  filterProductList(): any {
    const filters = this.filters;

    if (!filters.categorie && !filters.etat) {
      this.filters = null;
      return this.produitsSource;
    }

    let copyProduits = [];
    this.produitsSource.forEach(produit => copyProduits.push(produit));

    if (filters.categorie) {
      copyProduits = copyProduits.filter(val => val.categorieId === Number(filters.categorie));
    }

    if (filters.etat) {
      copyProduits = copyProduits.filter(val => val.etat.includes(filters.etat));
    }

    return copyProduits;

  }

  consulter(id: number): any {
    this.router.navigate(['../produit/' + id]);
  }

  addToPanier(produit: Produit): any {
    this.panierService.addToBasket(produit);
  }

}

interface Filter {
  etat: string;
  categorie: string;
}
