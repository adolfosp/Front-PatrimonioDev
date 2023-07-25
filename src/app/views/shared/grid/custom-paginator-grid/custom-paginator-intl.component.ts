import { Component, Injectable, NgModule } from "@angular/core";
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Primeira página`;
  itemsPerPageLabel = `Items por página:`;
  lastPageLabel = `Última página`;

  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }

}


@Component({
  selector: "app-paginator-intl",
  templateUrl: 'custom-paginator-intl.component.html',
})
export class CustomPaginatorIntlComponent {}


@NgModule({
  imports: [MatPaginatorModule],
  declarations: [CustomPaginatorIntlComponent],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class CustomPaginatorIntlModule {}
