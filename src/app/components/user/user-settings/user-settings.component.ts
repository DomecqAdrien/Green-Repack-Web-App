import { Version } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Achat } from 'src/app/model/Achat';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { Vente } from 'src/app/model/Vente';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  form: FormGroup;
  ventes: Vente[] = [];
  achats: Achat[] = [];
  userInfos: Utilisateur;
  dataSourceVentes = new MatTableDataSource<Vente>([]);
  dataSourceAchats = new MatTableDataSource<Achat>([]);
  displayedColumnsVentes = ['statut', 'date', 'produit'];
  displayedColumnsAchats = ['date', 'prix', 'produit'];
  email: string = "";
  isLoaded = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(): Promise<void> {
     this.userInfos = await this.userService.getUser(localStorage.getItem('green-repack-user-email'));
     this.email = this.userInfos.email;
     if(this.userInfos.role == "En attente"){
       this.alertService.info('Vous êtes en attente pour devenir marchand')
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

  async save(){
    //console.log(this.form.value)
    if(this.form.value.password == ""){
      console.log('dont send password')
      delete this.form.value.password;
      delete this.form.value.confirmPassword;
      console.log(this.form.value);
      await this.userService.updateUser(this.email, this.form.value)
      this.alertService.success('Update successful')
    }
    else if(this.form.value.password !== this.form.value.confirmPassword){
      this.alertService.error('Password and confirm are not identical')
    }
    else if(this.form.value.password === this.form.value.confirmPassword){
      console.log('send with password')
      delete this.form.value.confirmPassword;
      console.log(this.form.value)
      await this.userService.updateUser(this.email, this.form.value)
      this.alertService.success('Update successful')
    }
  }
  
  async becomeMarchand(){
    const user = new Utilisateur();
    user.role = "En attente";
    const update = await this.userService.updateUser(this.email, user);
    console.log(update);
    this.alertService.success('Votre demande a bien été prise en compte');
  }

}
