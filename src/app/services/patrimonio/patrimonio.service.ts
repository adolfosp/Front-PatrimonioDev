import { Injectable } from "@angular/core";
import { InformacaoAdicional } from "@nvs-models/InformacaoAdicional";
import InserirPatrimonioDto from "@nvs-models/dtos/InserirPatrimonioDto";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { IService } from "@nvs-models/interfaces/IService";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { ApiService } from "@nvs-services/api/api.service";
import { Observable, forkJoin } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PatrimonioService implements IService {
  baseUrl = `${environment.apiUrl}patrimonios`;

  constructor(private api: ApiService) {}
  cadastrar<T>(classe: T): Observable<DadosRequisicao> {

    const unknownValue = classe as unknown;
    const insercao = unknownValue as InserirPatrimonioDto

    return this.api
      .post<DadosRequisicao>(this.baseUrl, {
        patrimonio: insercao.patrimonio,
        informacaoAdicional: insercao.informacaoAdicional,
      })
      .pipe(take(1));
  }

  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
    return this.api
      .get<DadosRequisicao>(
        `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
      )
      .pipe(take(1));
  }

  remover(patrimonioId: number): Observable<DadosRequisicao> {
    return this.api.delete<DadosRequisicao>(`${this.baseUrl}/${patrimonioId}`).pipe(take(1));
  }

  obterRegistro(patrimonioId: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${patrimonioId}`).pipe(take(1));
  }

  atualizar<T>(classe: T): Observable<DadosRequisicao> {
    const insercao = classe as InserirPatrimonioDto;
    return this.api
      .put<DadosRequisicao>(`${this.baseUrl}/${insercao.patrimonio.codigoPatrimonio}`, {
        patrimonio: insercao.patrimonio,
        informacaoAdicional: insercao.informacaoAdicional,
      })
      .pipe(take(1));
  }

  private obterInformacaoAdicional(codigoPatrimonio: number): Observable<InformacaoAdicional> {
    return this.api.get<InformacaoAdicional>(`${environment.apiUrl}informacoes/${codigoPatrimonio}`).pipe(take(1));
  }

  private obterEmpresaPadrao(): Observable<string> {
    return this.api.get<string>(`${environment.apiUrl}empresas/empresaPadrao`, { responseType: "text" }).pipe(take(1));
  }

  public obterPatrimonioEInformacaoAdicional(codigoPatrimonio: number): Observable<any[]> {
    const respostaPatrimonio = this.obterRegistro(codigoPatrimonio);
    const respostaInformacaoAdicional = this.obterInformacaoAdicional(codigoPatrimonio);
    const respostaEmpresaPadrao = this.obterEmpresaPadrao();

    return forkJoin([respostaPatrimonio, respostaInformacaoAdicional, respostaEmpresaPadrao]);
  }
}
