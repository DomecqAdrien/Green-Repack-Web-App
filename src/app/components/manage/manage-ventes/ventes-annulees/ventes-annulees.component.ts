import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Vente } from 'src/app/model/Vente';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-ventes-annulees',
  templateUrl: './ventes-annulees.component.html',
  styleUrls: ['./ventes-annulees.component.scss']
})
export class VentesAnnuleesComponent implements OnInit {

  isLoaded = false;

  ventes: Vente[] = [];
  dataSource = new MatTableDataSource<Vente>([]);

  displayedColumns: string[] = ['id', 'titre', 'statut', 'date'];

  constructor(
    private router: Router,
    private venteService: VenteService
  ) { }

  ngOnInit(): void {
    this.getVentes();
  }

  async getVentes(): Promise<any> {
    this.ventes = await this.venteService.getVentesAnnulees();
    console.log(this.ventes);
    this.dataSource = new MatTableDataSource(this.ventes);
    console.log(this.dataSource.data);

    this.isLoaded = true;
  }

  showDetails(id: number): void{
    console.log(id);
    this.router.navigate(['../manage/ventes/' + id]);
  }

}
