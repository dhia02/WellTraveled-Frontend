import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

const componentName = "MatPaginatorIntlService";

/**
 * Utility service necessary to translate the mat-paginator
 * References:
 * https://material.angular.io/components/paginator/overview
 * https://stackoverflow.com/questions/46869616/how-to-use-matpaginatorintl
 */
@Injectable()
export class MatPaginationIntlService extends MatPaginatorIntl {
  constructor() {
    super();
    this.translateLabels();
  }
  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = "sur";
    if (length === 0 || pageSize === 0) {
      return "0 " + of + " " + length;
    }
    length = Math.max(length, 0);
    const startIndex =
      page * pageSize > length
        ? (Math.ceil(length / pageSize) - 1) * pageSize
        : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + " - " + endIndex + " " + of + " " + length;
  };

  translateLabels(): void {
    this.firstPageLabel = "Première page";
    this.itemsPerPageLabel = "Eléments par page";
    this.lastPageLabel = "Dernière page";
    this.nextPageLabel = "Page suivante";
    this.previousPageLabel = "Page précédente";
  }
}
