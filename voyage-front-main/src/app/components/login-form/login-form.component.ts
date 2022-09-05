import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { NavbarService } from "src/app/services/navbar.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
  @Input() isSessionExpired: Boolean;
  focus;
  focus1;
  loading: boolean;
  serverShutDown: Boolean;
  loginForm: FormGroup;
  visible: boolean;
  constructor(
    private auth: AuthService,
    private navBarService: NavbarService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(
      "login-form charged, isSessionExpired : ",
      this.isSessionExpired
    );
    this.visible = false;
    this.loading = false;
    this.serverShutDown = false;
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"),
      ]),
    });
  }
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  verifSameUser() {
    if (this.isSessionExpired && this.email.value != this.auth.getUserName()) {
      return false;
    }
    return true;
  }
  login() {
    this.loading = true;
    if (this.verifSameUser()) {
      this.auth.login(this.email.value, this.password.value).subscribe(
        (res: any) => {
          this.serverShutDown = false;
          console.log(res.headers.get("Authorization"));
          this.auth.setToken(res.headers.get("Authorization"));
          console.log(res.body);
          this.auth.getUserProfile(res.body.userName).subscribe(
            (result: any) => {
              if (!result.actif) {
                this.toastr.error("Votre compte est bloqué", "Echec");
              } else {
                this.auth.setToken(res.headers.get("Authorization"));
                if (this.isSessionExpired === true) {
                  this.auth.setToken(res.headers.get("Authorization"));
                  const obs = this.toastr.success(
                    "Session repris avec succès",
                    "Succès"
                  ).onHidden;
                  obs.subscribe((res) => {
                    this.navBarService.setNavBarState(true);
                    this.dialog.closeAll();
                    window.location.reload();
                  });
                } else {
                  delete result.password;
                  delete result.login;
                  delete result.actif;
                  this.auth.setCurrentUser(result);
                  this.navBarService.setNavBarState(true);
                  this.toastr.success(
                    "Utilisateur connecté avec succès",
                    "Succès",
                    {
                      positionClass: "toast-bottom-right",
                    }
                  );
                  this.router.navigate(["/user-profile"]);
                }
              }
              this.loading = false;
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          if (err.status == 0) {
            this.serverShutDown = true;
          } else {
            this.toastr.error("Mot de pass ou email incorrecte", "Echec");
          }
          this.loading = false;
        }
      );
    } else {
      localStorage.removeItem("Token");
      localStorage.removeItem("user");
      this.dialog.closeAll();
      this.toastr.error("email incorrecte", "Echec");
      this.router.navigate(["/login"]);
    }
  }

  toggle(e) {
    e.preventDefault();
    this.visible = !this.visible;
  }
}
