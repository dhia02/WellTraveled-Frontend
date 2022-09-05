import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NavbarService {
  private navStateSource = new Subject<Boolean>();
  navState$ = this.navStateSource.asObservable();
  constructor() {}

  setNavBarState(state: Boolean) {
    this.navStateSource.next(state);
  }
}
