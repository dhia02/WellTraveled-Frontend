import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { PasswordValidator } from "src/app/validators/password.validator";
import * as moment from "moment";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import "moment/locale/ja";
import "moment/locale/fr";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  //   },
  //   { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  // ],
})
export class RegisterComponent implements OnInit {
  test: Date = new Date();
  employeeSignUp: Boolean;
  nomParams: String;
  prenomParams: String;
  emailParams: String;
  mustCheck: Boolean;
  signUpForm: FormGroup;
  focus;
  focus1;
  focus2;
  selectedFile: File;
  fileName: String;
  loading: boolean;
  visible: boolean;
  visibleConfirm: boolean;
  checkPolicy: Boolean;
  checkIndependant: Boolean;
  base64: any;
  constructor(
    private _adapter: DateAdapter<any>,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.employeeSignUp = false;
    this.signUpForm = new FormGroup(
      {
        nom: new FormControl("", [Validators.required]),
        prenom: new FormControl(""),
        mobile: new FormControl("", [
          Validators.required,
          Validators.pattern("^[0-9]*"),
        ]),
        dateNaissance: new FormControl("", [Validators.required]),
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
        validatePassword: new FormControl("", [Validators.required]),
        check: new FormControl(""),
        independant: new FormControl(""),
      },
      [PasswordValidator]
    );
    this.route.queryParamMap.subscribe((params) => {
      this.nomParams = params.get("nom");
      this.prenomParams = params.get("prenom");
      this.emailParams = params.get("email");
      if (this.nomParams && this.prenomParams && this.emailParams) {
        this.employeeSignUp = true;
        this.signUpForm.patchValue({
          ...this.signUpForm.value,
          nom: this.nomParams,
          prenom: this.prenomParams,
          email: this.emailParams,
        });
      }
      console.log(this.nomParams, this.prenomParams, this.emailParams);
    });
    this._adapter.setLocale("fr");
    this.checkPolicy = false;
    this.checkIndependant = false;
    //this.mustCheck = false;
    this.visible = false;
    this.visibleConfirm = false;

    this.loading = false;
  }
  get check() {
    return this.signUpForm.get("check");
  }
  get email() {
    return this.signUpForm.get("email");
  }
  get password() {
    return this.signUpForm.get("password");
  }
  get validatePassword() {
    return this.signUpForm.get("validatePassword");
  }
  get nom() {
    return this.signUpForm.get("nom");
  }
  get prenom() {
    return this.signUpForm.get("prenom");
  }
  get mobile() {
    return this.signUpForm.get("mobile");
  }

  get dateNaissance() {
    return this.signUpForm.get("dateNaissance");
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.fileName = this.selectedFile.name;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      console.log(reader.result);
      this.base64 = reader.result;
    };
  }

  toggle(e) {
    e.preventDefault();
    this.visible = !this.visible;
  }

  toggleConfirm(e) {
    e.preventDefault();
    this.visibleConfirm = !this.visibleConfirm;
  }
  checkedToggle() {
    this.checkPolicy = !this.checkPolicy;
    if (this.checkPolicy == false) {
      this.mustCheck = true;
    } else {
      this.mustCheck = false;
    }
  }

  toTitleCase(name: AbstractControl) {
    name.setValue(this.convertToTitleCase(name.value));
  }

  convertToTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(`${event.value}`);
  }
  plusOneDay(date: any) {
    let addedDate = new Date(date);
    addedDate.setDate(addedDate.getDate() + 1);
    return addedDate;
  }

  register() {
    this.signUpForm.removeControl("check");
    //this.signUpForm.removeControl("independant");
    this.loading = true;
    const formData = new FormData();
    const userRegistration = {
      ...this.signUpForm.value,
      dateNaissance: new Date(this.dateNaissance.value._d),
      actif: false,
      roles: [
        { name: this.employeeSignUp === false ? "ENTREPRISE" : "EMPLOYE" },
      ],
    };
    formData.append("user", JSON.stringify(userRegistration));
    formData.append("file", this.selectedFile);
    this.auth.register(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success("Verifiez votre mail", "Succès");
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getDateNaissanceTime() {
    return new Date(this.dateNaissance.value._d).getTime();
  }
  checkedToggleIndependant() {
    this.checkIndependant = !this.checkIndependant;
  }
}
