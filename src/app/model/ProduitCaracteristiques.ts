export class ProduitCaracteristiques {
    id: number;
    valeur: string;
    caracteristiqueId: number;
    produitId: number;

    constructor(valeur: string, caracteristiqueId: number){
        this.valeur = valeur;
        this.caracteristiqueId = caracteristiqueId;
    }
}
