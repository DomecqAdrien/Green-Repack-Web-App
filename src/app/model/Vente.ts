import { Offre } from './Offre';
import { Produit } from './Produit';

export class Vente {
    id: number;
    statut: string;
    date: string;
    produit: Produit;
    offres: Offre[];

    constructor(statut: string, produit: Produit) {
        this.statut = statut;
        const dateLastDay = new Date(new Date().getFullYear(), 11, 31);
        this.date = dateLastDay.getFullYear() + '-' + (dateLastDay.getMonth() + 1) + '-' + dateLastDay.getDate();
        this.produit = produit;
    }
}
