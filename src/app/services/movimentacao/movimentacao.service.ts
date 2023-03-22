import { Injectable } from '@angular/core';
import { Movimentacao } from '@nvs-models/Movimentacao';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  baseUrl = `${environment.apiUrl}movimentacoes`;

  constructor(private api: ApiService) { }

  public realizarMovimentacao(movimentacao: Movimentacao): Observable<Movimentacao> {
    return this.api
    .post<Movimentacao>(this.baseUrl, {movimentacao})
    .pipe(take(1));
  }

  public obterTodasMovimentacoesDoPatrimonio(codigoPatrimonio: number): Observable<DadosRequisicao> {
    return this.api
    .get<DadosRequisicao>(`${this.baseUrl}/movimentacao/${codigoPatrimonio}`)
    .pipe(take(1));
  }

  public atualizarMovimentacao(movimentacao: Movimentacao, ): Observable<Movimentacao>{
    return this.api
    .put<Movimentacao>(`${this.baseUrl}/${movimentacao.codigoMovimentacao}`, {movimentacao})
    .pipe(take(1));
  }

  public obterApenasUmaMovimentacao(codigoMovimentacao: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoMovimentacao}`).pipe(take(1));
  }


}
