import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/Categorie';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { ProduitService } from 'src/app/services/produit.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  categories: Categorie[] = [];
  users: Utilisateur[] = [];
  isLoaded = false;
  isCatLoaded = false;
  userInfos: Utilisateur;

  constructor(
    private produitService: ProduitService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
    await this.getCategories();
    this.users = await this.userService.getUsersByRole('En attente');
    this.userInfos = await this.userService.getUser(localStorage.getItem('green-repack-user-email'));
    this.isLoaded = true;
  }

  async getCategories(): Promise<void> {
    this.isCatLoaded = false;
    this.categories = await this.produitService.getCategories();
    this.isCatLoaded = true;
  }

}
