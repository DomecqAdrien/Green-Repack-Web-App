import { Unite } from './Unite';

export class Caracteristique {
    id: number;
    libelle: string;
    unite: Unite;
    categorie: string;

    constructor(id: number, libelle: string, unite: Unite){
        this.id = id;
        this.libelle = libelle;
        this.unite = unite;
    }
}
