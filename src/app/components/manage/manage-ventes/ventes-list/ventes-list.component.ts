import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Vente } from 'src/app/model/Vente';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-vente-list',
  templateUrl: './ventes-list.component.html',
  styleUrls: ['./ventes-list.component.scss']
})
export class VentesEnCoursComponent implements OnInit {

  @Input() type: string;
  @Input() editable: boolean;
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
    console.log(this.type);
    this.ventes = await this.venteService.getVentesByStatus(this.type);
    console.log(this.ventes);
    this.dataSource = new MatTableDataSource(this.ventes);
    console.log(this.dataSource.data);

    this.isLoaded = true;
  }

  showDetails(id: number): void{
    if (this.editable){
      console.log(id);
      this.router.navigate(['../manage/ventes/' + id]);
    }
  }

}
