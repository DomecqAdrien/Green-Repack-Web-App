import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AchatService } from 'src/app/services/achat.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private achatService: AchatService,
    private panierSerive: PanierService
  ) { }

  ngOnInit(): void {
    this.checkRetour();
  }

  async checkRetour(): Promise<void> {
    this.route.queryParams.subscribe(async params => {
      if (params.key !== undefined) {
        // await this.achatService.validateAchat(params.key);
        this.router.navigate([], {
          queryParams: { key: null },
          queryParamsHandling: 'merge'
        });
      } else {
        // this.router.navigate(['/']);
      }
    });
  }

}
