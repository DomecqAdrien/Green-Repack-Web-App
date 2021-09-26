import { Caracteristique } from './Caracteristique';

export class ProduitCaracteristiques {
    id: number;
    valeur: string;
    caracteristique: Caracteristique;
    caracteristiqueId: number;
    produitId: number;

    constructor(caracteristiqueId: number, valeur: string){
        this.valeur = valeur;
        this.caracteristiqueId = caracteristiqueId;
    }
}
