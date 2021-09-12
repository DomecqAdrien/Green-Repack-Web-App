import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Caracteristiques } from 'src/app/model/Caracteristiques';
import { Dossier } from 'src/app/model/Dossier';
import { Produit } from 'src/app/model/Produit';
import { ProduitCaracteristiques } from 'src/app/model/ProduitCaracteristiques';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.scss']
})
export class SellFormComponent implements OnInit {

  form: FormGroup;
  
  champs = null;
  
  public filteredMarques: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  loading = false;

  categories = ['Téléphone', 'Electroménager'];
  etats = ['Neuf', 'Peu usé'];
  colonnes = {
    Electroménager: [new Caracteristiques(1, 'Poids'), new Caracteristiques(2, 'Taille')],
    Téléphone: [new Caracteristiques(1, 'Nom')]
  };
  defaultFields = {
    marque: ['', Validators.required],
    marqueFilter: [''],
    categorie: [''],
    description: [''],
    etat: ['', Validators.required]
  };

  constructor(
    private formBuilder: FormBuilder,
   ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.defaultFields);

    this.filteredMarques.next(this.categories.slice());

    this.form.controls.marqueFilter.valueChanges
      .subscribe(() => {
        this.filterMarques();
      });
  }

  filterMarques(): any{
    if (!this.categories) {
      return;
    }

    let search = this.form.value.marqueFilter;
    if (!search) {
      this.filteredMarques.next(this.categories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredMarques.next(
      this.categories.filter(bank => bank.toLowerCase().indexOf(search) > -1)
    );
  }

  onSubmit(): void {
    const values = (this.form.value);
    const newVente = new Dossier(
      '',
      new Produit(values.description, values.etat, values.categorie, [], [])
    );

    Object.keys(values).forEach(key => {
      if (key.startsWith('carac_')) {
        newVente.produit.produitCaracteristiques.push(new ProduitCaracteristiques(values[key], +key.replace('carac_', '')));
      }
    });

    console.log(newVente);
  }

  selectCategory(event: any): void{
    this.updateDefaultFields();
    this.champs = this.colonnes[event.value];
    const formWithCaracs = {};


    this.colonnes[event.value].forEach((carac: Caracteristiques) => {
      formWithCaracs['carac_' + carac.id] = new FormControl('');
    });
    Object.assign(formWithCaracs, this.defaultFields);
    this.form = this.formBuilder.group(formWithCaracs);
  }

  updateDefaultFields(): any {
    Object.keys(this.defaultFields).forEach(key => {
      this.defaultFields[key] = this.form.value[key];
    });
  }

}
