import { Categorie } from './Categorie';
import { Depot } from './Depot';
import { Image } from './Image';
import { ProduitCaracteristiques } from './ProduitCaracteristiques';


export class Produit {
    id?: number;
    description?: string;
    etat: string;
    categorie: number;
    depot: Depot;
    produitCaracteristiques: ProduitCaracteristiques[];
    images: Image[];

    constructor(description: string, etat: string, categorie: number, pc: ProduitCaracteristiques[], images: Image[]){
        this.description = description;
        this.etat = etat;
        this.categorie = categorie;
        this.produitCaracteristiques = pc;
        this.images = images;
    }
}
