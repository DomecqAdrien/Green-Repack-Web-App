import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { Article } from 'src/app/model/Article';
import { AchatService } from 'src/app/services/achat.service';
import { PanierService } from 'src/app/services/panier.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  stripePromise = loadStripe(environment.stripePublicKey);
  articles: Article[] = [];
  dataSource = new MatTableDataSource<Article>([]);
  isLoaded = false;
  displayedColumns = ['titre', 'prix', 'action'];
  total: number;

  constructor(
    private achatService: AchatService,
    private panierService: PanierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPanier();
    this.isLoaded = true;
  }

  getPanier(): void {
    this.articles = this.panierService.getPanier();
    this.dataSource = new MatTableDataSource(this.articles);
    this.calculTotal();
  }

  calculTotal(): void {
    this.total = 0;
    this.articles.forEach(article => this.total += article.prix);
  }

  removeFromPanier(articleId: number): void {
    this.panierService.removeFromBasket(articleId);
    this.getPanier();
  }

  async checkout(): Promise<void> {
    if (this.articles === []) {
      return;
    }
    try {
      const articles =  this.panierService.getPanier();
      const ids: number[] = [];
      articles.forEach(article => ids.push(article.id));
      const sessionId = await this.achatService.checkout(ids);
      const stripe = await this.stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    }catch (err) {
      console.log(err);
    }
  }
}
