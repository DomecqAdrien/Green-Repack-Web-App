import { Colis } from './Colis';
import { Vente } from './Vente';

export class Retour {
    id: number;
    statut: string;
    colidId: number;
    venteId: number;
    transactionId: string;

    colis: Colis;
    vente: Vente;
}
