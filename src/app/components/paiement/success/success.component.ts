import { AfterViewInit, Component, OnInit } from '@angular/core';
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
    const key = this.route.snapshot.queryParams.key;
    if (key !== undefined) {
      const response = await this.achatService.validateAchat(key);
      if (response.status.toString() === 'Achat non trouvé') {
        this.router.navigate(['/']);
      } else {
        this.panierSerive.resetPanier();
        this.router.navigate([], {
          queryParams: { key: null },
          queryParamsHandling: 'merge'
        });
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
