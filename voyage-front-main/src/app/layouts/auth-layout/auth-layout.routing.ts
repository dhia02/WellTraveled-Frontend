import { Routes } from "@angular/router";
import { ResetPasswordComponent } from "src/app/pages/reset-password/reset-password.component";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";

export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "login/:idU", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "register/:email/:nom/:prenom", component: RegisterComponent },
  { path: "resetPassword/:TokenEmail", component: ResetPasswordComponent },
];
