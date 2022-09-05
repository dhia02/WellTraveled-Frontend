import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class EntrepriseGuard implements CanActivate {
  logout() {
    this.router.navigate(["/login"]);
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      if (this.auth.isEntreprise()) {
        resolve(true);
      } else {
        this.logout();
        resolve(false);
      }
    });
  }
  constructor(private router: Router, private auth: AuthService) {}
}
