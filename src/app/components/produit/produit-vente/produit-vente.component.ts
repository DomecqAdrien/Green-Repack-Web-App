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
  filteredPrixVente: PrixVente[] = [];
  etats = ['Neuf', 'Peu utilisé', 'Dégradé'];


  defaultFields = {
    titre: ['', Validators.required],
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
    this.form = this.formBuilder.group(this.defaultFields);
    this.prixVente = await this.produitService.getPrixProduits();
    this.categories = await this.produitService.getCategories();
  }

  async onSubmit(): Promise<any> {
    if (this.files.length === 0) {
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
        newVente.produit.produitCaracteristiques.push(
          new ProduitCaracteristiques(+key.replace('carac_', ''), values[key]));
      }
    });

    for (const file of this.files) {
      const b64String = await this.readFile(file);
      // const b = await this.resizeImage(b64String);
      const img = await this.imageService.uploadImage(b64String);
      newVente.produit.images.push(img.data.url);
    }

    await this.produitService.createProduit(newVente);
    this.router.navigate(['/compte'], {queryParams: { vente: 'success' }});
  }


  selectCategory(event: any): void{

    this.isCategorySelected = true;

    const categorie = this.categories.filter(c => c.id === +event.value)[0];
    this.catPrixVente = this.prixVente.filter(p => p.categorieId === categorie.id);

    this.filteredPrixVente = this.catPrixVente;
    this.updateDefaultFields();

    this.caracteristiques = categorie.caracteristiques;
    const formWithCaracs = {};
    categorie.caracteristiques.forEach((carac: Caracteristique) => {
      this.caracsInstances[carac.id] = carac;
      formWithCaracs['carac_' + carac.id] = ['', Validators.required];
    });
    Object.assign(formWithCaracs, this.defaultFields);

    this.form = this.formBuilder.group(formWithCaracs);
  }

  updateDefaultFields(): any {
    Object.keys(this.defaultFields).forEach(key => {
      this.defaultFields[key] = [this.form.value[key], this.form.controls[key].validator];
    });
  }



  // GESTION IMAGES

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

  private async resizeImage(base64Str: string, maxWidth = 400, maxHeight = 350): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = maxWidth;
        const MAX_HEIGHT = maxHeight;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
    });
  }

}
