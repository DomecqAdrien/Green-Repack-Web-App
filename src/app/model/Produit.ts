import { Categorie } from './Categorie';
import { Depot } from './Depot';
import { Image } from './Image';
import { ProduitCaracteristiques } from './ProduitCaracteristiques';


export class Produit {
    id?: number;
    nom: string;
    description?: string;
    prix: string = '10';
    etat: string;
    statut: string;
    categorie: number;
    depot: Depot;
    produitCaracteristiques: ProduitCaracteristiques[];
    images: Image[];

    constructor(
        description: string,
        nom: string,
        etat: string,
        categorie: number,
        pc: ProduitCaracteristiques[],
        images: Image[]
    ){
        this.nom = nom;
        this.description = description;
        this.prix = '10';
        this.statut = 'En attente';
        this.etat = etat;
        this.categorie = categorie;
        this.produitCaracteristiques = pc;
        this.images = images;
    }
}
