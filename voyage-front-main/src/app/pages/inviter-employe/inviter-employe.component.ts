import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-inviter-employe",
  templateUrl: "./inviter-employe.component.html",
  styleUrls: ["./inviter-employe.component.css"],
})
export class InviterEmployeComponent implements OnInit {
  employeForm: FormGroup;
  loadingUpdate: Boolean;
  focus: any;
  constructor(private auth: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.employeForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"),
      ]),
      nom: new FormControl("", [Validators.required]),
      prenom: new FormControl("", [Validators.required]),
    });
  }
  get email() {
    return this.employeForm.get("email");
  }
  get nom() {
    return this.employeForm.get("nom");
  }
  get prenom() {
    return this.employeForm.get("prenom");
  }

  envoyerEmployer() {
    this.loadingUpdate = true;
    console.log(this.employeForm.value);
    this.auth
      .sendMailInvitationEmployee(
        this.email.value,
        this.nom.value,
        this.prenom.value
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.loadingUpdate = false;
          this.toastr.success(
            `Invitation envoyée par mail avec succès`,
            "Succès"
          );
          this.employeForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.loadingUpdate = false;
          this.toastr.error(`${err.error?.message}`, "Echec");
        },
      });
  }
}
