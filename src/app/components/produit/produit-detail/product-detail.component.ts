import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig, NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImageItem } from 'ng-gallery';
import { Produit } from 'src/app/model/Produit';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  isLoaded = false;
  produit: Produit;
  id: any;
  a = '/assets/icon.png';
  images = []; // [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    infinite: true
  };

  constructor(
    private route: ActivatedRoute,
    private config: NgbCarouselConfig,
    private produitService: ProduitService,
    private panierService: PanierService
  ) {

   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduit();

  }

  async getProduit(): Promise<void> {
    this.produit = await this.produitService.getProduitById(this.id);
    console.log(this.produit)
    for (const pImage of this.produit.images) {
      this.images.push(new ImageItem({
        src: pImage.url,
        thumb: pImage.url
      }));
    }
    this.isLoaded = true;
  }

  addToPanier(): any {
    this.panierService.addToBasket(this.produit);
  }

}
