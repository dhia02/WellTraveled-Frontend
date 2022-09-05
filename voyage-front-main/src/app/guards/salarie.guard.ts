import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { catchError, map, Observable, of, Subject } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class SalarieGuard implements CanActivate {
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
      if (this.auth.isSalarie()) {
        resolve(true);
      } else {
        this.logout();
        resolve(false);
      }
    });
  }
  constructor(private router: Router, private auth: AuthService) {}
}
