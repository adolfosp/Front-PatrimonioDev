import { Injectable } from "@angular/core";
import { MatSelect } from "@angular/material/select";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { quantidadeBuscaPorVezSelect } from "@nvs-utils/configuracao-paginacao";
import { Pagination } from "ngx-easy-table";

@Injectable({
  providedIn: "root",
})
export class SelectService {
  public deveObterMaisRegistros(event: any, select: MatSelect): boolean {
    if (
      select.panel.nativeElement.scrollTop ===
      select.panel.nativeElement.scrollHeight - select.panel.nativeElement.offsetHeight
    )
      return true;

    return false;
  }

  public ObterPaginacao(paginacao: Pagination): PaginacaoDto {
    paginacao.limit += quantidadeBuscaPorVezSelect;
    return new PaginacaoDto(paginacao.offset, paginacao.limit);
  }
}
