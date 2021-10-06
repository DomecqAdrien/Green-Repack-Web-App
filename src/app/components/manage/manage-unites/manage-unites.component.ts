import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categorie } from 'src/app/model/Categorie';
import { PrixVente } from 'src/app/model/PrixVente';
import { Unite } from 'src/app/model/Unite';
import { ProduitService } from 'src/app/services/produit.service';
import { CreateUniteComponent } from '../../dialog/create-unite/create-unite.component';

@Component({
  selector: 'app-manage-unites',
  templateUrl: './manage-unites.component.html',
  styleUrls: ['./manage-unites.component.scss']
})
export class ManageUnitesComponent implements OnInit {

  dataSource = new MatTableDataSource<Unite>([]);
  unites: Unite[] = [];
  displayedColumns = ['libelle', 'abreviation', 'type'];
  isLoaded = false;

  constructor(
    private dialog: MatDialog,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    this.getPrixVente();
  }

  async getPrixVente(): Promise<void> {
    this.unites = await this.produitService.getUnites();
    this.dataSource = new MatTableDataSource(this.unites);
    console.log(this.unites);
    this.isLoaded = true;
  }

  async addUnite(): Promise<void> {
    const unite = await this.dialog.open(CreateUniteComponent, {
      width: '30%',
      height: '45%'
    }).afterClosed().toPromise();
    if (unite !== undefined) {
      console.log(unite)
      const aa = await this.produitService.createUnite(unite);
      console.log(aa);
    }
  }
}
