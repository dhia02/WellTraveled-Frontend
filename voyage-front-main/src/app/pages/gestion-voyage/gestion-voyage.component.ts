import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Voyage } from "src/app/models/voyage.model";
import { AuthService } from "src/app/services/auth.service";
import { VoyageService } from "src/app/services/voyage.service";
interface Objet {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-gestion-voyage",
  templateUrl: "./gestion-voyage.component.html",
  styleUrls: ["./gestion-voyage.component.css"],
})
export class GestionVoyageComponent implements OnInit {
  objets: Objet[] = [
    { value: "VISITE_ENTREPRISE", viewValue: "Visite entreprise" },
    { value: "REUNION_PROFESSIONNELL", viewValue: "Réunion professionnelle" },
  ];
  voyageForm: FormGroup;
  voyage: Voyage;
  clickedRowsVoyage: Voyage;
  loadAjout: Boolean;
  dataSourceVoyage: MatTableDataSource<Voyage>;
  displayedColumnsC: string[] = [
    "destination",
    "dateDebut",
    "dateFin",
    "objet",
    "action",
  ];
  @ViewChild("CPaginator") cPaginator: MatPaginator;
  @ViewChild("CSort") cSort: MatSort;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private auth: AuthService,
    private voyageService: VoyageService
  ) {}

  ngOnInit(): void {
    this.voyageForm = new FormGroup({
      destination: new FormControl("", [Validators.required]),
      dateDebut: new FormControl("", [Validators.required]),
      dateFin: new FormControl("", [Validators.required]),
      objet: new FormControl("", [Validators.required]),
    });
    this.voyageService.getMyVoyage(this.auth.getUserId()).subscribe(
      (res: Voyage[]) => {
        console.log(res);
        this.dataSourceVoyage = new MatTableDataSource(res);
        this.dataSourceVoyage.sort = this.cSort;
        this.dataSourceVoyage.paginator = this.cPaginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  open(content, modalDimension, e: Event) {
    if (e) e.preventDefault();
    this.modalService
      .open(content, {
        centered: true,
        size: modalDimension,
        backdrop: "static",
        keyboard: false,
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  get destination() {
    return this.voyageForm.get("destination");
  }
  get dateDebut() {
    return this.voyageForm.get("dateDebut");
  }
  get dateFin() {
    return this.voyageForm.get("dateFin");
  }
  get objet() {
    return this.voyageForm.get("objet");
  }
  initVoyage() {
    this.voyage = new Voyage();
  }
  applyFilterVoyages(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVoyage.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceVoyage.paginator) {
      this.dataSourceVoyage.paginator.firstPage();
    }
  }

  loadVoyage(voyageClicked: Voyage) {
    this.voyage = new Voyage(voyageClicked);
    this.voyageForm.patchValue({
      ...this.voyage,
    });
  }
  chooseVoyage(row: Voyage) {
    this.clickedRowsVoyage = row;
    console.log(this.clickedRowsVoyage);
  }
  deleteVoyage() {
    this.voyageService
      .deleteVoyage(this.auth.getUserId(), this.clickedRowsVoyage.id)
      .subscribe(
        (res) => {
          this.toastr.success("Voyage supprimé avec succès", "Succès");
          let data = this.dataSourceVoyage.data;
          data = data.filter((u) => u.id != this.clickedRowsVoyage.id);
          this.dataSourceVoyage.data = data;
        },
        (err) => {
          console.log(err);
          this.toastr.error(err?.error?.message, "Echec");
        }
      );
  }
  sauveguarderVoyage() {
    this.loadAjout = true;
    console.log({
      ...this.voyageForm.value,
      creationDate: this.voyage.creationDate,
      id: this.voyage.id,
      utilisateurs: [{ id: this.auth.getUserId() }],
    });
    if (this.voyage.id === null) {
      this.voyageService
        .addVoyage(this.auth.getUserId(), {
          ...this.voyageForm.value,
          participants: 1,
          nbLikes: 0,
          nbDisLikes: 0,
        })
        .subscribe(
          (res: Voyage) => {
            this.loadAjout = false;
            console.log(res);
            const obs = this.toastr.success(
              "Voyage sauveguargé avec succès",
              "Succès"
            ).onHidden;
            obs.subscribe(
              () => {
                this.modalService.dismissAll();
              },
              (err) => {}
            );

            let data = this.dataSourceVoyage.data;

            data.push(res);

            this.dataSourceVoyage.data = data;
            this.voyageForm.reset();
          },
          (err) => {
            this.loadAjout = false;
            console.log(err);
            this.toastr.error("echec de sauvegarde", "Echec");
          }
        );
    } else {
      this.voyageService
        .modifyVoyage(this.voyage.id, {
          ...this.voyageForm.value,
          id: this.voyage.id,
          participants: this.voyage.participants,
          nbLikes: this.voyage.nbLikes,
          nbDisLikes: this.voyage.nbDisLikes,
          creationDate: this.voyage.creationDate,
        })
        .subscribe(
          (res: Voyage) => {
            this.loadAjout = false;
            console.log(res);
            const obs = this.toastr.success(
              "Voyage sauveguargé avec succès",
              "Succès"
            ).onHidden;
            obs.subscribe(
              () => {
                this.modalService.dismissAll();
              },
              (err) => {}
            );

            let data = this.dataSourceVoyage.data;

            data = data.map((voy) => (voy.id == this.voyage.id ? res : voy));

            this.dataSourceVoyage.data = data;
            this.voyageForm.reset();
          },
          (err) => {
            this.loadAjout = false;
            console.log(err);
            this.toastr.error("echec de sauvegarde", "Echec");
          }
        );
    }
  }
}
