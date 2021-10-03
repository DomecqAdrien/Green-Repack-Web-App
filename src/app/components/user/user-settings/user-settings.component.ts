import { Version } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Achat } from 'src/app/model/Achat';
import { Offre } from 'src/app/model/Offre';
import { Retour } from 'src/app/model/Retour';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { Vente } from 'src/app/model/Vente';
import { AchatService } from 'src/app/services/achat.service';
import { AlertService } from 'src/app/services/alert.service';
import { OffreService } from 'src/app/services/offre.service';
import { UserService } from 'src/app/services/user.service';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  form: FormGroup;
  ventes: Vente[] = [];
  achats: Achat[] = [];
  offres: Offre[] = [];
  retours: Retour[] = [];
  userInfos: Utilisateur;
  dataSourceVentes = new MatTableDataSource<Vente>([]);
  dataSourceAchats = new MatTableDataSource<Achat>([]);
  dataSourceOffres = new MatTableDataSource<Offre>([]);
  dataSourceRetours = new MatTableDataSource<Retour>([]);
  displayedColumnsAchats = ['date', 'produit', 'prix', 'statut'];
  displayedColumnsVentes = ['date', 'produit', 'statut'];
  displayedColumnsOffres = ['date', 'titre', 'prix', 'accept', 'refuse'];
  displayedColumnsRetours = ['statut', 'produit', 'accept', 'refuse'];
  email = '';
  isLoaded = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private offreService: OffreService,
    private venteService: VenteService,
    private achatService: AchatService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
     this.userInfos = await this.userService.getUser(localStorage.getItem('green-repack-user-email'));
     this.email = this.userInfos.email;
     if (this.userInfos.role === 'En attente'){
       this.alertService.info('Vous êtes en attente pour devenir marchand');
     }
     if (this.userInfos.role === 'Marchand') {

      this.ventes = await this.venteService.getVentesByUserAndFinished(this.email);
      this.offres = await this.offreService.getOffersByUser(this.email);
      this.achats = await this.achatService.getAchatsByUser(this.email);
      this.retours = await this.venteService.getRetoursByUser(this.email);

      this.dataSourceVentes = new MatTableDataSource(this.ventes);
      this.dataSourceOffres = new MatTableDataSource(this.offres);
      this.dataSourceAchats = new MatTableDataSource(this.achats);
      this.dataSourceRetours = new MatTableDataSource(this.retours)

      console.log(this.ventes);
      console.log(this.achats);
      console.log(this.offres);
      console.log(this.retours);
     }

     this.isLoaded = true;
     this.form = this.formBuilder.group({
      prenom: [this.userInfos.prenom],
      nom: [this.userInfos.nom],
      email: [this.userInfos.email],
      adresse: [this.userInfos.adresse],
      codePostal: [this.userInfos.codePostal],
      ville: [this.userInfos.ville],
      password: [''],
      confirmPassword: ['']
    });

  }

  async updateOffer(offre: Offre, statut: string): Promise<void> {
      console.log(offre.id + statut);

      (document.getElementById('accept-btn' + offre.id) as HTMLButtonElement).disabled = true;
      (document.getElementById('refuse-btn' + offre.id) as HTMLButtonElement).disabled = true;

      const a = await this.offreService.updateOfferStatus(offre.id, statut);
      console.log(a);
  }

  async updateRetour(retour: Retour, statut: string): Promise<void> {

  }

  async save(): Promise<void> {
    // console.log(this.form.value)
    if (this.form.value.password === ''){
      console.log('dont send password');
      delete this.form.value.password;
      delete this.form.value.confirmPassword;
      console.log(this.form.value);

      await this.userService.updateUser(this.email, this.form.value);
      this.alertService.success('Update successful');
    }
    else if (this.form.value.password !== this.form.value.confirmPassword){
      this.alertService.error('Password and confirm are not identical');
    }
    else if (this.form.value.password === this.form.value.confirmPassword){
      console.log('send with password');
      delete this.form.value.confirmPassword;
      console.log(this.form.value);
      await this.userService.updateUser(this.email, this.form.value);
      this.alertService.success('Update successful');
    }
  }

  async becomeMarchand(): Promise<void> {
    const user = new Utilisateur();
    user.role = 'En attente';
    const update = await this.userService.updateUser(this.email, user);
    console.log(update);
    this.alertService.success('Votre demande a bien été prise en compte');
  }

}
