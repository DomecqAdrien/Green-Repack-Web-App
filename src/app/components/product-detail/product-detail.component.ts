import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig, NgbConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  id: number;
  a = '/assets/icon.png';
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    infinite: true
  };

  constructor(
    private route: ActivatedRoute,
    private config: NgbCarouselConfig,
  ) {

   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
    });
  }

}
