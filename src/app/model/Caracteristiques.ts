export class Caracteristiques {
    id: number;
    libelle: string;
    uniteId: number;
    categorieId: number;

    constructor(id: number, libelle: string){
        this.id = id;
        this.libelle = libelle;
    }
}
