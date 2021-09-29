import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Caracteristique } from 'src/app/model/Caracteristique';
import { Categorie } from 'src/app/model/Categorie';
import { Unite } from 'src/app/model/Unite';
import { ProduitService } from 'src/app/services/produit.service';
import { ConfirmComponent } from '../../dialog/confirm/confirm.component';
import { CreateCaracteristiqueComponent } from '../../dialog/create-caracteristique/create-caracteristique.component'

@Component({
  selector: 'app-manage-caracteristiques',
  templateUrl: './manage-caracteristiques.component.html',
  styleUrls: ['./manage-caracteristiques.component.scss']
})
export class ManageCaracteristiquesComponent implements OnInit {

  @Input() categories: Categorie[];
  unites: Unite[];
  displayedColumns: string[] = ['categorie', 'libelle', 'unite'];
  dataSource = new MatTableDataSource<Caracteristique>([]);
  allCaracs: Caracteristique[] = [];

  constructor(
    private produitService: ProduitService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<any> {
    console.log(this.categories);
    for (const cat of this.categories) {
      for (const car of cat.caracteristiques) {
        car.categorie = cat.libelle;
      }
      this.allCaracs.push(...cat.caracteristiques);
    }
    this.unites = await this.produitService.getUnites();
    this.dataSource = new MatTableDataSource(this.allCaracs);
  }

  selectCategory(event: any): void {
    const categorie = this.categories.filter(c => c.id === +event.value)[0];
    this.dataSource = new MatTableDataSource(categorie.caracteristiques);
    console.log(categorie.caracteristiques);
  }

  deleteCaracteristique(carac: Caracteristique): void {
    console.log(carac);
    this.dialog.open(ConfirmComponent, {
      data: {
        message: `Êtes vous sur de vouloir supprimer la caractéristique ${carac.categorie} - ${carac.libelle} ?`
      },
      width: '30%',
      height: '20%'
    }).afterClosed().toPromise().then(result => {
      console.log(result);
      if (result) {
        this.produitService.deleteCaracteristique(carac.id);
      }
    });
  }
  async addCaracteristique(): Promise<void> {
    const carac = await this.dialog.open(CreateCaracteristiqueComponent, {
      width: '30%',
      height: '20%',
      data: {
        categories: this.categories,
        unites: this.unites
      }
    }).afterClosed().toPromise();
    console.log(carac)
    if (carac !== undefined) {
      const caracToCreate = new Caracteristique()
      caracToCreate.libelle= carac.libelle
      caracToCreate.uniteId = parseInt(carac.unite)
      caracToCreate.categorieId = parseInt(carac.categorie)
      console.log(caracToCreate)
      const aa = await this.produitService.createCaracteristique(caracToCreate);
      console.log(aa);
      this.getData()
    }
  }

}
