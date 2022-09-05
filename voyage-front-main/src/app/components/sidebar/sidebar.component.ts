import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Utilisateur } from "src/app/models/utilisateur.model";
import { AuthService } from "src/app/services/auth.service";
import { NavbarService } from "src/app/services/navbar.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  hidden: Boolean;
  salarie: Boolean;
  entreprise: Boolean;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/user-profile",
    title: "Profile",
    icon: "ni-single-02 text-red",
    class: "",
    entreprise: true,
    hidden: false,
    salarie: true,
  },
  {
    path: "/inviter-employe",
    title: "Inviter employés",
    icon: "ni-email-83 text-green",
    class: "",
    entreprise: true,
    hidden: false,
    salarie: false,
  },
  {
    path: "/gestion-voyage",
    title: "Gestion de mes voyages",
    icon: "fa fa-plane text-green",
    class: "",
    entreprise: false,
    hidden: false,
    salarie: true,
  },
  {
    path: "/voyages-similaires",
    title: "Voyages similaires",
    icon: "fa fa-plane text-blue",
    class: "",
    entreprise: false,
    hidden: false,
    salarie: true,
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  user: Utilisateur;
  public isCollapsed = true;
  state: Boolean;
  token: String = null;
  constructor(
    private routerS: Router,
    private navBarService: NavbarService,
    private auth: AuthService
  ) {
    navBarService.navState$.subscribe((state) => {
      this.state = state;
      this.token = auth.getToken();
      this.user = this.auth.getCurrentUser();
    });
  }

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    if (this.auth.isEntreprise()) {
      this.menuItems = ROUTES.filter((menuItem) => menuItem.entreprise);
    } else if (this.auth.isSalarie()) {
      this.menuItems = ROUTES.filter((menuItem) => menuItem.salarie);
    }
    this.routerS.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.token = this.auth.getToken();
  }
  get router() {
    return this.routerS;
  }

  logout(e: any) {
    e.preventDefault();
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    this.token = null;
    this.routerS.navigate(["/login"]);
  }
  login(e: any) {
    e.preventDefault();
    this.routerS.navigate(["/login"]);
  }
}
