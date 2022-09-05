import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Utilisateur } from "../models/utilisateur.model";
import { Role } from "../models/role.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly URL: string = "http://localhost:8078/voyage/";
  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    return this.http.post(
      this.URL + "login",
      { login, password },
      { observe: "response" }
    );
  }
  verifyServerHealth() {
    return this.http.get(this.URL + "actuator/health");
  }
  signUp(val: any) {
    return this.http.post(this.URL + "user/inscription", val);
  }
  register(val: FormData) {
    return this.http.post(this.URL + "user/signUp", val);
  }

  getUserProfile(login: String) {
    return this.http.get(this.URL + `user/${login}`);
  }

  sendMailResetPassword(to: String) {
    return this.http.post(this.URL + `user/send/${to}`, {});
  }
  sendMailConfirmRegister(to: String) {
    return this.http.post(this.URL + `user/sendConfirmRegister/${to}`, {});
  }
  sendMailInvitationEmployee(email: String, nom: String, prenom: String) {
    return this.http.post(
      this.URL +
        `user/sendEmployeeInvitation?email=${email}&nom=${nom}&prenom=${prenom}`,
      {}
    );
  }

  resetPassword(to: String, newPass: string) {
    return this.http.post(this.URL + `user/resetPassword/${to}`, newPass);
  }

  updateProfile(idU: Number, user: FormData) {
    return this.http.put(this.URL + `user/editProfile/${idU}`, user);
  }
  updateActif(idU: Number) {
    return this.http.patch(this.URL + `user/editActif/${idU}`, {});
  }

  getToken() {
    return localStorage.getItem("Token");
  }
  setToken(token) {
    localStorage.setItem("Token", token);
  }

  getUserName() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user != null ? user.email : null;
  }
  setUserName(email) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    this.setCurrentUser({ ...user, email });
  }

  getRoles() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user != null ? user.authorities : null;
  }
  setRoles(authorities) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    this.setCurrentUser({ ...user, authorities });
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user != null ? user.id : null;
  }
  setUserId(id) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    this.setCurrentUser({ ...user, id });
  }
  getUserPhoto() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user != null ? user.photoBytes : null;
  }
  setUserPhoto(photoBytes) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    this.setCurrentUser({ ...user, photoBytes });
  }
  getUserNom() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user != null ? user.nom : null;
  }
  setUserNom(nom) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    this.setCurrentUser({ ...user, nom });
  }
  getUserPrenom() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user != null ? user.prenom : null;
  }
  setUserPrenom(prenom) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    this.setCurrentUser({ ...user, prenom });
  }

  getUserPhone() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user != null ? user.telephone : null;
  }
  setUserPhone(telephone) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    this.setCurrentUser({ ...user, telephone });
  }

  isEntreprise() {
    const adminRole: Role[] = this.getRoles();
    const role: Role = adminRole.find((role) => role.libelle === "ENTREPRISE");
    return role ? true : false;
  }

  isSalarie() {
    const salarieRole: Role[] = this.getRoles();
    const role: Role = salarieRole.find((role) => role.libelle === "EMPLOYE");
    return role ? true : false;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
  setCurrentUser(user: Utilisateur) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //reset password items

  setTokenEmail(token) {
    localStorage.setItem("TokenEmail", token);
  }
  getTokenEmail() {
    return localStorage.getItem("TokenEmail");
  }
  getUserEmail() {
    return localStorage.getItem("UserEmail");
  }
  setUserEmail(mail) {
    localStorage.setItem("UserEmail", mail);
  }
  setRegistredIdChecking(id) {
    localStorage.setItem("IdChecking", id);
  }

  getRegistredIdChecking() {
    return localStorage.getItem("IdChecking");
  }

  setRegisterationUser(user) {
    localStorage.setItem("RegistrationUser", JSON.stringify(user));
  }

  getRegisterationUser() {
    return JSON.parse(localStorage.getItem("RegistrationUser") || "null");
  }
}
