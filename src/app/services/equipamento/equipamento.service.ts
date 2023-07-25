import { Injectable } from "@angular/core";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { ApiService } from "@nvs-services/api/api.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { IService } from "@nvs-models/interfaces/IService";

@Injectable({
  providedIn: "root",
})
export class EquipamentoService implements IService {
  baseUrl = `${environment.apiUrl}equipamentos`;

  constructor(private api: ApiService) {}

  cadastrar<T>(equipamento: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, { equipamento }).pipe(take(1));
  }

  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
    return this.api
      .get<DadosRequisicao>(
        `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
      )
      .pipe(take(1));
  }

  remover(codigoEquipamento: number): Observable<DadosRequisicao> {
    return this.api.delete<DadosRequisicao>(`${this.baseUrl}/${codigoEquipamento}`).pipe(take(1));
  }

  obterRegistro(codigoEquipamento: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoEquipamento}`).pipe(take(1));
  }

  atualizar<T>(equipamento: T): Observable<DadosRequisicao> {
    return this.api
      .put<DadosRequisicao>(`${this.baseUrl}/${equipamento["codigoTipoEquipamento"]}`, { equipamento })
      .pipe(take(1));
  }
}
