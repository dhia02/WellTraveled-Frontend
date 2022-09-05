import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NavbarService } from "src/app/services/navbar.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm: FormGroup;
  resetForm: FormGroup;
  closeResult: string;
  serverShutDown: Boolean;
  idU: Number;
  @Input()
  diameter: number;
  loading: boolean;
  loadingSend: boolean;
  visible: boolean;
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private navBarService: NavbarService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array]);
    return blob;
  }
  ngOnInit() {
    this.auth.verifyServerHealth().subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status != "UP") {
          this.router.navigate(["/serverDown"]);
        } else {
          this.idU = +this.route.snapshot.params.idU;
          if (this.idU) {
            console.log("this.idU : ", this.idU);
            console.log("now activate the account here!!");
            this.auth.updateActif(this.idU).subscribe({
              next: (res) => {
                console.log(res);
                this.toastr.success("Inscription réussite", "succès");
              },
              error: (err) => {
                console.log(err);
              },
            });
          }

          this.serverShutDown = false;
          this.visible = false;
          this.loading = false;
          this.loadingSend = false;
          this.loginForm = new FormGroup({
            email: new FormControl("", [
              Validators.required,
              Validators.pattern(
                "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
              ),
            ]),
            password: new FormControl("", [
              Validators.required,
              Validators.pattern("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"),
            ]),
          });
          this.resetForm = new FormGroup({
            emailReset: new FormControl("", [
              Validators.required,
              Validators.pattern(
                "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
              ),
            ]),
          });
        }
      },
      error: (err) => {
        this.router.navigate(["/serverDown"]);
      },
    });
  }
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  get emailReset() {
    return this.resetForm.get("emailReset");
  }

  envoyer() {
    this.loadingSend = true;
    console.log(this.emailReset.value);
    this.auth.sendMailResetPassword(this.emailReset.value).subscribe(
      (res) => {
        console.log(res);
        this.loadingSend = false;
        const obs = this.toastr.success(
          "Merci de vérifier votre mail",
          "Succès"
        ).onHidden;
        obs.subscribe(() => {
          this.modalService.dismissAll();
        });
        this.auth.setTokenEmail(res);
        this.auth.setUserEmail(this.emailReset.value);
      },
      (err) => {
        console.log(err);
        this.loadingSend = false;
        this.toastr.error(err.error.message, "Echec");
      }
    );
  }

  open(content, type, modalDimension) {
    if (modalDimension === "sm" && type === "modal_mini") {
      this.modalService
        .open(content, {
          windowClass: "modal-mini",
          size: "sm",
          centered: true,
        })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: $result";
          },
          (reason) => {
            this.closeResult = "Dismissed $this.getDismissReason(reason)";
          }
        );
    } else if (modalDimension === "" && type === "Notification") {
      this.modalService
        .open(content, { windowClass: "modal-danger", centered: true })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: $result";
          },
          (reason) => {
            this.closeResult = "Dismissed $this.getDismissReason(reason)";
          }
        );
    } else {
      this.modalService.open(content, { centered: true }).result.then(
        (result) => {
          this.closeResult = "Closed with: $result";
        },
        (reason) => {
          this.closeResult = "Dismissed $this.getDismissReason(reason)";
        }
      );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  toggle(e) {
    e.preventDefault();
    this.visible = !this.visible;
  }
}
