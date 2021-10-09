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
  selector: 'app-produit-vente',
  templateUrl: './produit-vente.component.html',
  styleUrls: ['./produit-vente.component.scss']
})
export class SellFormComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  isCategorySelected = false;
  hasImage = true;


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
    titreFilter: [''],
    categorie: ['', Validators.required],
    description: [''],
    etat: ['', Validators.required]
  };

  defaultFields2 = {
    titre: ['', Validators.required],
    marque: ['', Validators.required],
    titreFilter: [''],
    categorie: ['', Validators.required],
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
    console.log(this.defaultFields);
    this.form = this.formBuilder.group(this.defaultFields);
    this.prixVente = await this.produitService.getPrixProduits();
    this.categories = await this.produitService.getCategories();
  }

  selectCategory(event: any): void{

    this.isCategorySelected = true;

    const categorie = this.categories.filter(c => c.id === +event.value)[0];
    this.catPrixVente = this.prixVente.filter(p => p.categorieId === categorie.id);

    this.filteredPrixVente.next(this.catPrixVente.slice());

    this.form.controls.titreFilter.valueChanges
      .subscribe(() => {
        this.filterMarques();
    });


    this.updateDefaultFields();

    // console.log(this.defaultFields)
    this.caracteristiques = categorie.caracteristiques;
    const formWithCaracs = {};
    categorie.caracteristiques.forEach((carac: Caracteristique) => {
      this.caracsInstances[carac.id] = carac;
      formWithCaracs['carac_' + carac.id] = ['', Validators.required];
    });
    Object.assign(formWithCaracs, this.defaultFields);

    console.log(formWithCaracs);
    this.form = this.formBuilder.group(formWithCaracs);
  }

  filterMarques(): any{
    if (!this.categories) {
      return;
    }

    this.isLoading = true;
    let search = this.form.value.titreFilter;
    if (!search) {
      this.filteredPrixVente.next(this.catPrixVente.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredPrixVente.next(
      this.catPrixVente.filter(prix => prix.titre.toLowerCase().indexOf(search) > -1)
    );
  }

  async onSubmit(): Promise<any> {
    if (this.files.length === 0) {
      console.log('no image');
      this.hasImage = false;
      return;
    }
    if (this.form.invalid) {
      return;
    }

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
      this.defaultFields[key] = [this.form.value[key], this.form.controls[key].validator];
    });
  }

  onSelect(event: any): void {
    this.hasImage = true;
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
