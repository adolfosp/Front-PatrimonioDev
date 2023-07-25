import { Injectable } from "@angular/core";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { ApiService } from "@nvs-services/api/api.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { IService } from "@nvs-models/interfaces/IService";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";

@Injectable({
  providedIn: "root",
})
export class FuncionarioService implements IService {
  baseUrl = `${environment.apiUrl}funcionarios`;

  constructor(private api: ApiService) {}
  cadastrar<T>(funcionario: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, { funcionario }).pipe(take(1));
  }

  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
    return this.api
      .get<DadosRequisicao>(
        `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
      )
      .pipe(take(1));
  }

  remover(codigoFuncionario: number): Observable<DadosRequisicao> {
    return this.api.delete<DadosRequisicao>(`${this.baseUrl}/${codigoFuncionario}`).pipe(take(1));
  }

  obterRegistro(codigoFuncionario: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoFuncionario}`).pipe(take(1));
  }

  atualizar<T>(funcionario: T): Observable<DadosRequisicao> {
    return this.api
      .put<DadosRequisicao>(`${this.baseUrl}/${funcionario["codigoFuncionario"]}`, { funcionario })
      .pipe(take(1));
  }
}
