import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { AlertService } from 'src/app/services/alert.service';
import { ProduitService } from 'src/app/services/produit.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmComponent } from '../../dialog/confirm/confirm.component';
import { CreateTechnicienComponent } from '../../dialog/create-technicien/create-technicien.component';

@Component({
  selector: 'app-manage-techniciens',
  templateUrl: './manage-techniciens.component.html',
  styleUrls: ['./manage-techniciens.component.scss']
})
export class ManageTechniciensComponent implements OnInit {

  dataSource = new MatTableDataSource<Utilisateur>([]);
  techniciens: Utilisateur[] = [];
  displayedColumns = ['nom', 'prenom', 'email', 'action'];
  isLoaded = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getTechniciens();
  }

  async getTechniciens(): Promise<void> {
    this.techniciens = await this.userService.getTechniciens();
    this.dataSource = new MatTableDataSource(this.techniciens);
    this.isLoaded = true;
  }

  async removeTechnicien(technicien: Utilisateur): Promise<void> {
    this.dialog.open(ConfirmComponent, {
      data: {
        message: `Êtes vous sur de vouloir supprimer le technicien ${technicien.nom} - ${technicien.prenom} ?`
      },
      width: '30%',
      height: '20%'
    }).afterClosed().toPromise().then(async result => {
      if (result) {
        await this.userService.deleteUser(technicien.id);
        this.getTechniciens();
      }
    });
  }

  async addTechnicien(): Promise<void> {
    this.dialog.open(CreateTechnicienComponent, {
      disableClose: true
    }).afterClosed().toPromise().then(result => {

    });
  }

}
