import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { NavbarService } from "src/app/services/navbar.service";

@Component({
  selector: "app-dialog-modal-component-login",
  templateUrl: "./dialog-modal-component-login.component.html",
  styleUrls: ["./dialog-modal-component-login.component.css"],
})
export class DialogModalComponentLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  visible: boolean;
  focus;
  focus1;
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private navBarService: NavbarService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.visible = false;
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

  login() {
    this.loading = true;

    this.auth.login(this.email.value, this.password.value).subscribe(
      (res: any) => {
        console.log(res.headers.get("Authorization"));
        this.auth.setToken(res.headers.get("Authorization"));
        this.loading = false;
        const obs = this.toastr.success(
          "Session repris avec succès",
          "Succès"
        ).onHidden;
        obs.subscribe((res) => {
          this.navBarService.setNavBarState(true);
          this.dialog.closeAll();
          window.location.reload();
        });
      },
      (err) => {
        console.log(err);
        this.toastr.error("Mot de pass ou email incorrecte", "Echec");
        this.loading = false;
      }
    );
  }

  toggle(e) {
    e.preventDefault();
    this.visible = !this.visible;
  }
  logout() {
    this.router.navigate(["/login"]);
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
  }
  redirectLogin() {
    this.dialog.closeAll();
    this.logout();
  }
}
