import { Injectable } from '@angular/core';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { IService } from '@nvs-models/interfaces/IService';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService implements IService {

  baseUrl = `${environment.apiUrl}empresas`;

  constructor(private api: ApiService) { }
  cadastrar<T>(empresa: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, {empresa}).pipe(take(1));
  }

  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`).pipe(take(1))
  }

  remover(codigo: number): Observable<DadosRequisicao> {
    return this.api
    .delete<DadosRequisicao>(`${this.baseUrl}/${codigo}`)
    .pipe(take(1));
  }

  obterRegistro(codigoEmpresa: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoEmpresa}`).pipe(take(1));
  }

  atualizar<T>(empresa: T): Observable<DadosRequisicao> {
    return this.api
    .put<DadosRequisicao>(`${this.baseUrl}/${empresa["codigoEmpresa"]}`, {empresa})
    .pipe(take(1));  }

  public obterEmpresaPadrao(): Observable<string> {
    return this.api.get<string>(`${this.baseUrl}/empresaPadrao`).pipe(take(1));
  }

}
