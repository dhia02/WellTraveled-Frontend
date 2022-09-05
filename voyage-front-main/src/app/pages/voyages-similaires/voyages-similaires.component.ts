import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Voyage } from "src/app/models/voyage.model";
import { AuthService } from "src/app/services/auth.service";
import { VoyageService } from "src/app/services/voyage.service";

@Component({
  selector: "app-voyages-similaires",
  templateUrl: "./voyages-similaires.component.html",
  styleUrls: ["./voyages-similaires.component.css"],
})
export class VoyagesSimilairesComponent implements OnInit {
  voyages: Voyage[] = [];
  constructor(
    private voyageService: VoyageService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.voyageService.getVoyageSimilaire(this.auth.getUserId()).subscribe({
      next: (res: Voyage[]) => {
        this.voyages = res;
        console.log(this.voyages);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  aimer(voyage: Voyage, aime: Boolean) {
    this.voyageService
      .likesDislikes(this.auth.getUserId(), voyage.id, aime)
      .subscribe({
        next: (res: Voyage) => {
          this.voyages = this.voyages.map((v) =>
            v.id === voyage.id ? res : v
          );
        },
        error: (err) => {
          this.toastr.error(err.error?.message, "Echec");
        },
      });
  }
  participer(voyage: Voyage) {
    this.voyageService
      .addParticipantToVoyage(this.auth.getUserId(), voyage.id)
      .subscribe({
        next: () => {
          this.toastr.success("Vous avez participé avec succès", "Succès");
          this.voyages = this.voyages.map((v) => {
            if (v.id === voyage.id) {
              v.participants++;
            }
            return v;
          });
        },
        error: (err) => {
          this.toastr.error(err.error?.message, "Echec");
        },
      });
  }
}
