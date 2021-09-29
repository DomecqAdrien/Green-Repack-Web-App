import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from './model/Article';
import { PanierService } from './services/panier.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLogged: boolean;
  isMarchand: boolean;
  isTechnicien: boolean;
  isAdministrateur: boolean;
  panier: Article[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private panierService: PanierService
  ) {}


  ngOnInit(): void {
    if (this.userService.loggedIn()) {
      this.userService.setIsLogged(true);
    }
    this.panierService.setPanier();
    this.userService.isLogged.subscribe(isLogged => this.isLogged = isLogged);
    this.panierService.panier.subscribe(panier => this.panier = panier);
    this.isAdministrateur = this.userService.isAdmin();
    this.isTechnicien = this.userService.isTechnicien();
    this.isMarchand = this.userService.isMarchand();
    console.log(this.isMarchand);
    console.log(this.isTechnicien);
    console.log(this.isAdministrateur);
    console.log(this.panier.length);
  }

  logout(): void{
    this.userService.logout();
    this.panierService.resetPanier();
    this.router.navigate(['login']);
    this.isAdministrateur = false;
    this.isTechnicien = false;
    this.isMarchand = false;
  }

  onToggleSidenav(): void {

  }
}
