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
    this.userService.isMarchand.subscribe(isMarchand => this.isMarchand = isMarchand);
    this.userService.isTechnicien.subscribe(isTechnicien => this.isTechnicien = isTechnicien);
    this.userService.isAdmin.subscribe(isAdmin => this.isAdministrateur = isAdmin);
    this.panierService.panier.subscribe(panier => this.panier = panier);
  }

  logout(): void{
    this.userService.logout();
    this.panierService.resetPanier();
    this.isAdministrateur = false;
    this.isTechnicien = false;
    this.isMarchand = false;
    this.router.navigate(['/login']);
  }

  onToggleSidenav(): void {

  }
}
