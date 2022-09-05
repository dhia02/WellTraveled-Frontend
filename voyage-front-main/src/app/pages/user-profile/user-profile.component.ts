import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Utilisateur } from "src/app/models/utilisateur.model";
import { AuthService } from "src/app/services/auth.service";
import { NavbarService } from "src/app/services/navbar.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  user: any;
  disabledControl: Boolean;
  count: Number;
  age: Number;
  isSalarie: Boolean;
  loadingUser: Boolean;
  loadingCount: Boolean;
  profileForm: FormGroup;
  loadingUpdate: Boolean;
  selectedFile: File;
  base64: any;
  nbFact: Number;
  focus: any;
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private navBarService: NavbarService
  ) {}

  ngOnInit() {
    this.disabledControl = true;
    this.isSalarie = this.auth.isSalarie();
    this.profileForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"),
      ]),
      nom: new FormControl("", [Validators.required]),
      telephone: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*"),
      ]),
    });
    this.loadingUser = true;
    this.loadingCount = true;

    this.auth.getUserProfile(this.auth.getUserName()).subscribe(
      (res: Utilisateur) => {
        console.log(res);
        if (this.isSalarie) {
          const dateNaiss = new Date(res.dateNaissance);
          this.age = this.getYearDiff(dateNaiss);
        }
        this.user = res;
        this.profileForm.patchValue({ ...this.user });
        this.loadingUser = false;
      },
      (err) => {
        console.log(err);
        this.loadingUser = false;
      }
    );
  }

  get email() {
    return this.profileForm.get("email");
  }
  get nom() {
    return this.profileForm.get("nom");
  }
  get telephone() {
    return this.profileForm.get("telephone");
  }

  getYearDiff(dateNaiss: Date) {
    let diff = (dateNaiss.getTime() - new Date().getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff / 365.25));
  }

  editProfile() {
    const formData = new FormData();
    formData.append("user", JSON.stringify({ ...this.profileForm.value }));
    formData.append("file", this.selectedFile);

    this.loadingUpdate = true;
    this.auth.updateProfile(this.auth.getUserId(), formData).subscribe(
      (res: Utilisateur) => {
        console.log(res);
        this.user = res;
        this.loadingUpdate = false;
        this.toastr.success("Profile modifié avec succès", "Succès");
        this.auth.setUserPhoto(res.photoBytes);
        this.auth.setUserName(res.email);
        this.auth.setUserNom(res.nom);
        this.auth.setUserPhone(res.telephone);
        this.navBarService.setNavBarState(true);
      },
      (err) => {
        console.log(err);
        this.loadingUpdate = false;
        this.toastr.error(err.error.message, "Echec");
      }
    );
    this.disabledControl = true;
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.base64 = reader.result;
    };
  }

  enableControls() {
    this.disabledControl = false;
  }
}
