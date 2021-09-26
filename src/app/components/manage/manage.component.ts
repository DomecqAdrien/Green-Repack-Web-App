import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/Categorie';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  categories: Categorie[] = [];
  isLoaded = false;

  constructor(
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
    this.categories = await this.produitService.getCategories();
    this.isLoaded = true;
  }

}
