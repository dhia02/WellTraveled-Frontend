import { Role } from "./role.model";

export class Utilisateur {
  id: Number;
  actif: Boolean;
  dateInscription: Date;
  dateNaissance: Date;
  email: String;
  nom: String;
  prenom: String;
  roles: Role[];
  telephone: String;
  photoBytes: String;
}
