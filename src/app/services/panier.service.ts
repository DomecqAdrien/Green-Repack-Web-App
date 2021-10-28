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
      nom : produit.titre,
      prix : produit.prix
    };

    const storage = this.getPanier();
    if (!this.checkIfInPanier(article.id)){
      storage.push(article);
      this.storePanier(storage);
      this.setPanier();
    }
  }

  checkIfInPanier(id: number): boolean {
    const storage = this.getPanier();
    return storage.some(a => a.id === id);
  }

  hasPanier(): boolean {
    return this.getPanier() != null;
  }

  removeFromBasket(id: number): void {
    const storage = this.getPanier();
    this.storePanier(storage.filter(a => a.id !== id));
    this.setPanier();
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
