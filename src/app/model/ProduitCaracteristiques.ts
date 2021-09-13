import { Caracteristique } from './Caracteristique';

export class ProduitCaracteristiques {
    id: number;
    valeur: string;
    caracteristique: Caracteristique;
    produitId: number;

    constructor(valeur: string, caracteristique: Caracteristique){
        this.valeur = valeur;
        this.caracteristique = caracteristique;
    }
}
