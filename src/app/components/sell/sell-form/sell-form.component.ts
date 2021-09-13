import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Caracteristique } from 'src/app/model/Caracteristique';
import { Dossier } from 'src/app/model/Dossier';
import { Produit } from 'src/app/model/Produit';
import { ProduitCaracteristiques } from 'src/app/model/ProduitCaracteristiques';
import { Unite } from 'src/app/model/Unite';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.scss']
})
export class SellFormComponent implements OnInit {

  files: any[] = [];
  form: FormGroup;
  champs = null;
  public filteredMarques: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  loading = false;

  categories = ['Téléphone', 'Electroménager'];
  etats = ['Neuf', 'Peu usé'];
  colonnes = {
    Electroménager: [
      new Caracteristique(1, 'Poids', new Unite('Kilogramme', 'number', 'Kg')),
      new Caracteristique(2, 'Taille', new Unite('Mètres', 'number', 'm'))
    ],
    Téléphone: [
      new Caracteristique(1, 'Nom', new Unite('Texte', 'text', ''))
    ]
  };
  defaultFields = {
    marque: ['', Validators.required],
    marqueFilter: [''],
    categorie: [''],
    description: [''],
    etat: ['', Validators.required]
  };

  caracsInstances = {};

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
      new Produit(values.description, 'Iphone 6', values.etat, values.categorie, [], [])
    );

    Object.keys(values).forEach(key => {
      if (key.startsWith('carac_')) {
        const caracId = key.substr(8, 1);
        console.log(caracId);
        newVente.produit.produitCaracteristiques.push(
          new ProduitCaracteristiques(values[key], this.caracsInstances[key.replace('carac_', '')]));
      }
    });

    console.log(newVente);
  }

  selectCategory(event: any): void{
    this.updateDefaultFields();
    this.champs = this.colonnes[event.value];


    const formWithCaracs = {};


    this.colonnes[event.value].forEach((carac: Caracteristique) => {
      this.caracsInstances[carac.libelle] = carac;
      formWithCaracs['carac_' + carac.libelle] = new FormControl('');
    });
    Object.assign(formWithCaracs, this.defaultFields);
    this.form = this.formBuilder.group(formWithCaracs);
  }

  updateDefaultFields(): any {
    Object.keys(this.defaultFields).forEach(key => {
      this.defaultFields[key] = this.form.value[key];
    });
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files): any {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

}
