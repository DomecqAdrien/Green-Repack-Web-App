import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-ventes',
  templateUrl: './manage-ventes.component.html',
  styleUrls: ['./manage-ventes.component.scss']
})
export class SellComponent implements OnInit {

  produitEnAttente = 'produit-en-attente';
  enCours = 'en-cours';
  annule = 'annule';
  termine = 'termine';

  constructor() { }

  ngOnInit(): void {
  }

}
