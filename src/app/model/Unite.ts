export class Unite {
    id: number;
    libelle: string;
    type: string;
    abreviation: string;

    constructor(libelle: string, type: string, abreviation: string){
        this.libelle = libelle;
        this.type = type,
        this.abreviation = abreviation;
    }
}