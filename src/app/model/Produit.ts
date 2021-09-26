import { Categorie } from './Categorie';
import { Depot } from './Depot';
import { Image } from './Image';
import { ProduitCaracteristiques } from './ProduitCaracteristiques';


export class Produit {
    id?: number;
    titre: string;
    description?: string;
    prix: number;
    etat: string;
    statut: string;
    categorieId: number;
    depot: Depot;
    produitCaracteristiques: ProduitCaracteristiques[];
    images: Image[];

    constructor(
        description: string,
        titre: string,
        etat: string,
        categorie: number,
        pc: ProduitCaracteristiques[],
        images: Image[]
    ){
        this.titre = titre;
        this.description = description;
        this.statut = 'En attente';
        this.etat = etat;
        this.categorieId = categorie;
        this.produitCaracteristiques = pc;
        this.images = images;
    }
}
