import { CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { ClipboardModule } from "ngx-clipboard";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTableModule } from "@angular/material/table";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxPaginationModule } from "ngx-pagination";
import { DialogModalComponentLoginComponent } from "src/app/pages/dialog-modal-component-login/dialog-modal-component-login.component";
import { MatPaginationIntlService } from "src/app/services/mat-pagination-intl.service";
import { ComponentsModule } from "src/app/components/components.module";
import { CalendarModule } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { MatIconModule } from "@angular/material/icon";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import "moment/locale/ja";
import "moment/locale/fr";
import * as _moment from "moment";
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
} from "@angular/material/radio";

import * as moment from "moment";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import {
  IgxDatePickerModule,
  IgxProgressBarModule,
  IgxRadioModule,
} from "igniteui-angular";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { InviterEmployeComponent } from "src/app/pages/inviter-employe/inviter-employe.component";
import { GestionVoyageComponent } from "src/app/pages/gestion-voyage/gestion-voyage.component";
import { VoyagesSimilairesComponent } from "src/app/pages/voyages-similaires/voyages-similaires.component";

registerLocaleData(localeFr);
// export function momentAdapterFactory() {
//   return adapterFactory(moment);
// }
export const MY_FORMATS = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    ClipboardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    NgxPaginationModule,
    MatCheckboxModule,
    ComponentsModule,
    MatIconModule,
    IgxProgressBarModule,
    MatRadioModule,
    IgxDatePickerModule,
    IgxRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatListModule,
  ],
  declarations: [
    UserProfileComponent,
    DialogModalComponentLoginComponent,
    InviterEmployeComponent,
    GestionVoyageComponent,
    VoyagesSimilairesComponent,
  ],

  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MatPaginatorIntl, useClass: MatPaginationIntlService },
    { provide: LOCALE_ID, useValue: "fr-FR" },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: "primary" },
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
