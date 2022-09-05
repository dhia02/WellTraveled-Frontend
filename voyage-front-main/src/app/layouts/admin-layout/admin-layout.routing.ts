import { Routes } from "@angular/router";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { SalarieGuard } from "src/app/guards/salarie.guard";
import { EntrepriseGuard } from "src/app/guards/entreprise.guard";
import { InviterEmployeComponent } from "src/app/pages/inviter-employe/inviter-employe.component";
import { GestionVoyageComponent } from "src/app/pages/gestion-voyage/gestion-voyage.component";
import { VoyagesSimilairesComponent } from "src/app/pages/voyages-similaires/voyages-similaires.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "inviter-employe",
    component: InviterEmployeComponent,
    canActivate: [AuthGuard, EntrepriseGuard],
  },
  {
    path: "gestion-voyage",
    component: GestionVoyageComponent,
    canActivate: [AuthGuard, SalarieGuard],
  },
  {
    path: "voyages-similaires",
    component: VoyagesSimilairesComponent,
    canActivate: [AuthGuard, SalarieGuard],
  },
];
