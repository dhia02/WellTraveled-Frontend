import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Voyage } from "../models/voyage.model";

@Injectable({
  providedIn: "root",
})
export class VoyageService {
  readonly URL: string = "http://localhost:8078/voyage/";
  constructor(private http: HttpClient) {}

  addVoyage(idU: Number, v: Voyage) {
    return this.http.post(this.URL + `voyages/${idU}`, v);
  }
  getMyVoyage(idU: Number) {
    return this.http.get(this.URL + `voyages/${idU}`);
  }
  deleteVoyage(idU: Number, idV: Number) {
    return this.http.delete(this.URL + `voyages/${idU}/${idV}`);
  }
  modifyVoyage(idV: Number, v: Voyage) {
    return this.http.put(this.URL + `voyages/${idV}`, v);
  }
  getVoyageSimilaire(idU: Number) {
    return this.http.get(this.URL + `voyages/similaire/${idU}`);
  }
  addParticipantToVoyage(idU: Number, idV: Number) {
    return this.http.post(
      this.URL + `voyages/addParticipantToVoyage/${idU}/${idV}`,
      {}
    );
  }
  likesDislikes(idU: Number, idV: Number, like: Boolean) {
    return this.http.post(
      this.URL + `voyages/likesDislikes/${idU}/${idV}/${like}`,
      {}
    );
  }
}
