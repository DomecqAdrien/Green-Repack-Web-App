import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { Caracteristique } from 'src/app/model/Caracteristique';
import { Vente } from 'src/app/model/Vente';
import { Produit } from 'src/app/model/Produit';
import { ProduitCaracteristiques } from 'src/app/model/ProduitCaracteristiques';
import { ProduitService } from 'src/app/services/produit.service';
import { ImageService } from 'src/app/services/image.service';
import { Categorie } from 'src/app/model/Categorie';
import { PrixVente } from 'src/app/model/PrixVente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vente-create',
  templateUrl: './vente-create.component.html',
  styleUrls: ['./vente-create.component.scss']
})
export class SellFormComponent implements OnInit {

  loading = false;
  form: FormGroup;

  isCategorySelected = false;


  files: File[] = [];
  categories: Categorie[] = [];
  prixVente: PrixVente[] = [];
  catPrixVente: PrixVente[] = [];
  caracteristiques: Caracteristique[] = [];
  filteredPrixVente: ReplaySubject<PrixVente[]> = new ReplaySubject<PrixVente[]>(1);
  etats = ['Neuf', 'Peu utilisé', 'Dégradé'];


  defaultFields = {
    titre: ['', Validators.required],
    marque: ['', Validators.required],
    marqueFilter: [''],
    categorie: [''],
    description: [''],
    etat: ['', Validators.required]
  };

  caracsInstances = {};

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private imageService: ImageService,
    private router: Router
   ) { }

  async ngOnInit(): Promise<any> {

    this.form = this.formBuilder.group(this.defaultFields);
    this.prixVente = await this.produitService.getPrixProduits();
    console.log(this.prixVente);

    this.categories = await this.produitService.getCategories();
    console.log(this.categories);

    const caracs = await this.produitService.getCaracteristiques();
    console.log(caracs);
  }

  selectCategory(event: any): void{
    this.isCategorySelected = true;

    const categorie = this.categories.filter(c => c.id === +event.value)[0];

    console.log(categorie);

    this.catPrixVente = this.prixVente.filter(p => p.categorieId === categorie.id);

    console.log(this.catPrixVente);
    this.filteredPrixVente.next(this.catPrixVente.slice());

    this.form.controls.marqueFilter.valueChanges
      .subscribe(() => {
        this.filterMarques();
    });


    this.updateDefaultFields();

    this.caracteristiques = categorie.caracteristiques;
    const formWithCaracs = {};
    categorie.caracteristiques.forEach((carac: Caracteristique) => {
      this.caracsInstances[carac.id] = carac;
      formWithCaracs['carac_' + carac.id] = new FormControl('');
    });
    Object.assign(formWithCaracs, this.defaultFields);
    this.form = this.formBuilder.group(formWithCaracs);
  }

  filterMarques(): any{
    if (!this.categories) {
      return;
    }

    let search = this.form.value.marqueFilter;
    if (!search) {
      this.filteredPrixVente.next(this.catPrixVente.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredPrixVente.next(
      this.catPrixVente.filter(bank => bank.titre.toLowerCase().indexOf(search) > -1)
    );
  }

  async onSubmit(): Promise<any> {
    const values = (this.form.value);
    const newVente = new Vente(
      'En cours',
      new Produit(values.description, values.titre, values.etat, values.categorie, [], [])
    );

    Object.keys(values).forEach(key => {
      if (key.startsWith('carac_')) {
        console.log(key.replace('carac_', ''));
        newVente.produit.produitCaracteristiques.push(
          new ProduitCaracteristiques(+key.replace('carac_', ''), values[key]));
      }
    });

    for (const file of this.files) {
      const a = await this.readFile(file);
      const img = await this.imageService.uploadImage(a);
      console.log(img);
      newVente.produit.images.push(img.data.url);
    }

    console.log(newVente);
    await this.produitService.createProduit(newVente);
    this.router.navigate(['/compte'], {queryParams: { vente: 'success' }});
  }

  updateDefaultFields(): any {
    Object.keys(this.defaultFields).forEach(key => {
      this.defaultFields[key] = this.form.value[key];
    });
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private async readFile(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
