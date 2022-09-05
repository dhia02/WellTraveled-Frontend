import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], chercher: any): any[] {
    if (chercher == "") {
      return array;
    } else {
      return array.filter((element) =>
        element.libelle.toLowerCase().includes(chercher.toLowerCase())
      );
    }
  }
}
