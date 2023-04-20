import { Injectable } from '@angular/core';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { Fabricante } from '@nvs-models/Fabricante';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import Paginacao from '@nvs-models/dtos/Paginacao';

@Injectable()
export class FabricanteService {

  constructor(private api: ApiService) { }

  baseUrl = `${environment.apiUrl}fabricantes`;

  public cadastrarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.api.post<Fabricante>(this.baseUrl, {fabricante}).pipe(take(1));
  }

  public obterFabricantes(paginacao: Paginacao): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`).pipe(take(1))
  }

  public deletarFabricante(codigoFabricante: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${codigoFabricante}`)
    .pipe(take(1));
  }

  public obterApenasUmFabricante(codigoFabricante: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoFabricante}`).pipe(take(1));
  }

  public atualizarFabricante(fabricante: Fabricante): Observable<Fabricante>{
    return this.api
    .put<Fabricante>(`${this.baseUrl}/${fabricante.codigoFabricante}`, {fabricante})
    .pipe(take(1));
  }

}
