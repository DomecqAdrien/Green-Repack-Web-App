import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dossier } from 'src/app/model/Dossier';

@Component({
  selector: 'app-sell-new',
  templateUrl: './sell-new.component.html',
  styleUrls: ['./sell-new.component.scss']
})
export class SellNewComponent implements OnInit {

  dossiers: Dossier[] = [];

  displayedColumns: string[] = ['Id', 'Statut', 'Date'];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const aaa = new Dossier('aaa', null);
    aaa.id = 1;
    this.dossiers.push(aaa);
  }

  showDetails(id: number): void{
    console.log(id);
    this.router.navigate(['../ventes/' + id]);
  }

}
