import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { isJwtExpired } from "jwt-check-expiration";
import { MatDialog } from "@angular/material/dialog";
import { DialogModalComponentLoginComponent } from "../pages/dialog-modal-component-login/dialog-modal-component-login.component";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    public router: Router,
    private toastr: ToastrService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenComp = this.auth.getToken();
    let clone: HttpRequest<any> = req.clone({});
    if (tokenComp) {
      if (!isJwtExpired(tokenComp.split(" ")[1])) {
        clone = req.clone({
          setHeaders: {
            Authorization: tokenComp,
          },
        });
      } else if (
        !req.url.includes("/login") &&
        !req.url.includes("/signUp") &&
        !req.url.includes("/actuator")
      ) {
        this.openDialog();
        clone = req.clone({
          setHeaders: {
            Authorization: tokenComp,
          },
        });
      }
    } else {
      clone = req.clone({
        setHeaders: {
          Accept: `application/json`,
          //'Content-Type': `application/json`
        },
      });
    }
    return next.handle(clone).pipe(
      catchError((error) => {
        if (error.status == 0 && this.router.url !== "/login") {
          this.toastr.error("Ouups! Le serveur est arrêté", "Echec");
          this.router.navigate(["/login"]);
          localStorage.removeItem("Token");
          localStorage.removeItem("user");
        }
        console.error("error is intercept", error);
        return throwError(error);
      })
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogModalComponentLoginComponent, {
      disableClose: true,
    });
  }
}
export class DialogContentExampleDialog {}
