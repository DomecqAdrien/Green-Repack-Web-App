import { Produit } from './Produit';

export class Dossier {
    id: number;
    statut: string;
    date: Date;
    produit: Produit;

    constructor(statut: string, produit: Produit) {
        this.statut = statut;
        this.date = new Date();
        this.produit = produit;
    }
}
