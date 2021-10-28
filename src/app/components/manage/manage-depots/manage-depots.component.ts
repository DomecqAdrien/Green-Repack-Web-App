import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Depot } from 'src/app/model/Depot';
import { DepotService } from 'src/app/services/depot.service';
import { CreateDepotComponent } from '../../dialog/create-depot/create-depot.component';

@Component({
  selector: 'app-manage-depots',
  templateUrl: './manage-depots.component.html',
  styleUrls: ['./manage-depots.component.scss']
})
export class ManageDepotsComponent implements OnInit {

  dataSource = new MatTableDataSource<Depot>([]);
  depots: Depot[] = [];
  displayedColumns = ['libelle', 'adresse', 'codePostal', 'ville', 'capacite'];
  isLoaded = false;

  constructor(
    private dialog: MatDialog,
    private depotService: DepotService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDepots();
  }

  async getDepots(): Promise<void> {
    this.depots = await this.depotService.getDepots();
    this.dataSource = new MatTableDataSource(this.depots);
    this.isLoaded = true;
  }

  showDetails(id: number): void{
    this.router.navigate(['../manage/depot/' + id]);
  }

  async addDepot(): Promise<void> {
    const depot = await this.dialog.open(CreateDepotComponent, {
      width: '30%',
      height: '65%'
    }).afterClosed().toPromise();
    if (depot !== undefined) {
      await this.depotService.createDepot(depot);
      this.getDepots();
    }
  }
}
