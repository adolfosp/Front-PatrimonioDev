import { Injectable } from "@angular/core";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { ApiService } from "@nvs-services/api/api.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { IService } from "@nvs-models/interfaces/IService";

@Injectable()
export class FabricanteService implements IService {
  baseUrl = `${environment.apiUrl}fabricantes`;

  constructor(private api: ApiService) {}
  cadastrar<T>(fabricante: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, { fabricante }).pipe(take(1));
  }

  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
    return this.api
      .get<DadosRequisicao>(
        `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
      )
      .pipe(take(1));
  }

  remover(codigoFabricante: number): Observable<DadosRequisicao> {
    return this.api.delete<DadosRequisicao>(`${this.baseUrl}/${codigoFabricante}`).pipe(take(1));
  }

  obterRegistro(codigoFabricante: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoFabricante}`).pipe(take(1));
  }

  atualizar<T>(fabricante: T): Observable<DadosRequisicao> {
    return this.api
      .put<DadosRequisicao>(`${this.baseUrl}/${fabricante["codigoFabricante"]}`, { fabricante })
      .pipe(take(1));
  }
}
