import { Version } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Achat } from 'src/app/model/Achat';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { Vente } from 'src/app/model/Vente';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  ventes: Vente[] = [];
  achats: Achat[] = [];
  userInfos: Utilisateur;
  dataSourceVentes = new MatTableDataSource<Vente>([]);
  dataSourceAchats = new MatTableDataSource<Achat>([]);
  displayedColumnsVentes = ['statut', 'date', 'produit'];
  displayedColumnsAchats = ['date', 'prix', 'produit'];

  isLoaded = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async getData(): Promise<void> {
    // this.userInfos = await this.userService.getUser()
  }

}
