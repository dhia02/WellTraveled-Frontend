import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";
import { Sort } from "../util/sort";

@Directive({
  selector: "[appSort]",
})
export class SortDirective {
  @Input() appSort: Array<any>;
  constructor(private renderer: Renderer2, private targetElem: ElementRef) {}

  @HostListener("click")
  sortData() {
    const sort = new Sort();
    // get ref of current clicked element
    const elem = this.targetElem.nativeElement;
    // get order from element clicked
    const order = elem.getAttribute("data-order");
    // get type of element from element clicked
    const type = elem.getAttribute("data-type");
    // get property name from element clicked
    const property = elem.getAttribute("data-name");
    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
    } else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
    }
  }
}
