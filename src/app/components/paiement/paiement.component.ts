import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { PaiementService } from 'src/app/services/paiement.service';
import { PanierService } from 'src/app/services/panier.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  stripePromise = loadStripe(environment.stripePublicKey);

  constructor(
    private paiementService: PaiementService,
    private panierService: PanierService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async checkout(): Promise<void> {
    try {
      const articles =  this.panierService.getPanier();
      const ids: number[] = [];
      articles.forEach(article => ids.push(article.id));
      const sessionId = await this.paiementService.checkout(ids);
      const stripe = await this.stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    }catch (err) {
      console.log(err);
    }
  }

}
