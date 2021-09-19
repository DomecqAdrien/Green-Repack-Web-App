import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../model/Article';
import { Produit } from '../model/Produit';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  panier = new BehaviorSubject<Article[]>([]);

  constructor() { }

  addToBasket(produit: Produit): void {
    const article: Article = {
      id : produit.id,
      nom : produit.description,
      prix : produit.prix
    };

    const storage = this.getPanier();
    storage.push(article);
    this.storePanier(storage);
    console.log(localStorage);
    this.setPanier();
  }

  hasPanier(): boolean {
    return this.getPanier() != null;
  }

  removeFromBasket(): void {

  }

  setPanier(): void {
    let storage = this.getPanier();
    if (storage == null){
      this.storePanier([]);
      storage = [];
    }
    this.panier.next(storage);
  }

  getPanier(): Article[] {
    return JSON.parse(localStorage.getItem('green-repack-basket'));
  }

  storePanier(value: Article[]): void {
    localStorage.setItem('green-repack-basket', JSON.stringify(value));
  }

  resetPanier(): void {
    localStorage.removeItem('green-repack-basket');
    this.setPanier();
  }
}
