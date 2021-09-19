import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from './model/Article';
import { Produit } from './model/Produit';
import { PanierService } from './services/panier.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLogged: boolean;
  panier: Article[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private panierService: PanierService
  ) {}


  ngOnInit(): void {
    if (this.userService.loggedIn()) {
      this.userService.setIsLogged(true);
      // this.panier.push(new Produit('a','a','a',1,[],[]))
    }
    this.panierService.setPanier();
    this.userService.isLogged.subscribe(isLogged => this.isLogged = isLogged);
    this.panierService.panier.subscribe(panier => this.panier = panier);
    console.log(this.panier.length);
  }

  logout(): void{
    this.userService.logout();
    this.panierService.resetPanier();
    this.router.navigate(['login']);
  }
}
