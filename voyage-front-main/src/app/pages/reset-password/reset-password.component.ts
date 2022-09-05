import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { PasswordValidator } from "src/app/validators/password.validator";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  focus;
  focus1;
  resetForm: FormGroup;
  closeResult: string;
  TokenEmail: String;
  loading: boolean;
  visible: boolean;
  visibleConfirm: boolean;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,

    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.visible = false;
    this.visibleConfirm = false;
    this.loading = false;
    this.TokenEmail = this.route.snapshot.params.TokenEmail;
    const generatedTokenEmail = this.auth.getTokenEmail();
    if (this.TokenEmail && this.TokenEmail == generatedTokenEmail) {
      console.log({ TokenEmail: this.TokenEmail, generatedTokenEmail });
      this.toastr.success(
        "Merci de réinitialiser votre mot de passe",
        "Mail vérifié"
      );
    } else {
      this.router.navigate(["/login"]);
    }
    this.resetForm = new FormGroup(
      {
        password: new FormControl("", [
          Validators.required,
          Validators.pattern("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"),
        ]),
        validatePassword: new FormControl("", [
          Validators.required,
          Validators.pattern("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"),
        ]),
      },
      [PasswordValidator]
    );
  }
  get password() {
    return this.resetForm.get("password");
  }
  get validatePassword() {
    return this.resetForm.get("validatePassword");
  }

  resetPassword() {
    this.loading = true;
    this.auth
      .resetPassword(this.auth.getUserEmail(), this.password.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.loading = false;
          const obs = this.toastr.success(
            "Mot de passe modifié",
            "Succès"
          ).onHidden;
          localStorage.removeItem("TokenEmail");
          localStorage.removeItem("UserEmail");
          obs.subscribe(() => {
            this.router.navigate(["/login"]);
          });
        },
        (err) => {
          this.loading = false;
          console.log(err);
          this.toastr.error(err.error?.message, "Echec");
        }
      );
  }

  toggle(e) {
    e.preventDefault();
    this.visible = !this.visible;
  }
  toggleConfirm(e) {
    e.preventDefault();
    this.visibleConfirm = !this.visibleConfirm;
  }
}
