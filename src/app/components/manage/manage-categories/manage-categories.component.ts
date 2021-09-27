import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categorie } from 'src/app/model/Categorie';
import { ProduitService } from 'src/app/services/produit.service';
import { CreateCategorieComponent } from '../../dialog/create-categorie/create-categorie.component';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

  @Input() categories: Categorie[];
  dataSource = new MatTableDataSource<Categorie>([]);
  displayedColumns = ['libelle'];

  constructor(
    private dialog: MatDialog,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.categories);
  }

  async addCategorie(): Promise<void> {
    const categorie = await this.dialog.open(CreateCategorieComponent, {
      width: '30%',
      height: '20%'
    }).afterClosed().toPromise();
    if (categorie !== undefined) {
      const aa = await this.produitService.createCategorie(categorie);
      console.log(aa);
    }
  }

}
