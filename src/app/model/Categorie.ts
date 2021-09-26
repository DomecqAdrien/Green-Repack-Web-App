import { Caracteristique } from "./Caracteristique";

export class Categorie {
    id: number;
    libelle: string;
    caracteristiques: Caracteristique[];

    constructor(id: number, libelle: string){
        this.id = id;
        this.libelle = libelle;
    }
}
