import { Utilisateur } from "./utilisateur.model";

export class Voyage {
  id: Number;
  objet: String;

  dateDebut: Date;

  dateFin: Date;
  creationDate: Date;

  destination: String;

  utilisateurs: Utilisateur[];
  participants: number;
  nbLikes: number;
  nbDisLikes: number;
  constructor(voy: Voyage = null) {
    this.id = voy?.id ?? null;
    this.objet = voy?.objet ?? "";
    this.dateDebut = voy?.dateDebut ?? null;
    this.dateFin = voy?.dateFin ?? null;
    this.creationDate = voy?.creationDate ?? null;
    this.destination = voy?.destination ?? "";
    this.participants = voy?.participants ?? 0;
    this.nbLikes = voy?.nbLikes ?? 0;
    this.nbDisLikes = voy?.nbDisLikes ?? 0;
  }
}
