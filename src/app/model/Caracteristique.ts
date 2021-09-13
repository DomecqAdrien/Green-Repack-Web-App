import { Categorie } from "./Categorie";
import { Unite } from "./Unite";

export class Caracteristique {
    id: number;
    libelle: string;
    categorie: Categorie;
    unite: Unite;

    constructor(id: number, libelle: string, unite: Unite){
        this.id = id;
        this.libelle = libelle;
        this.unite = unite;
    }
}
