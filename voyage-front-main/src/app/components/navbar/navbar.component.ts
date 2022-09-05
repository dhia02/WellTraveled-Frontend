import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NavbarService } from "src/app/services/navbar.service";
import { Utilisateur } from "src/app/models/utilisateur.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  user: Utilisateur;
  public listTitles: any[];
  public location: Location;
  token: String = null;
  state: Boolean;
  constructor(
    location: Location,
    private router: Router,
    private auth: AuthService,
    private navBarService: NavbarService
  ) {
    this.location = location;
    navBarService.navState$.subscribe((state) => {
      this.state = state;
      this.token = auth.getToken();
      this.user = this.auth.getCurrentUser();
    });
  }

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    if (this.auth.isSalarie()) {
      this.listTitles = ROUTES.filter((menuItem) => menuItem.salarie);
    } else if (this.auth.isEntreprise()) {
      this.listTitles = ROUTES.filter((menuItem) => menuItem.entreprise);
    }
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
  logout(e: any) {
    e.preventDefault();
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    this.token = null;
    this.router.navigate(["/login"]);
  }
}
