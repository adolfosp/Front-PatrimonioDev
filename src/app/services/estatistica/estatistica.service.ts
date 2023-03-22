import { Injectable } from '@angular/core';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {

  constructor(private api: ApiService) { }

  baseUrl = `${environment.apiUrl}estatisticas`;

  private obterEstatisticasCategoria(): Observable<DadosRequisicao>{
    return this.api.get<DadosRequisicao>(this.baseUrl).pipe(take(1));
  }

  private obterMediaEquipamentoPorFuncionario(): Observable<DadosRequisicao>{
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/media`).pipe(take(1));
  }

  private obterPatrimonioDisponivel(): Observable<DadosRequisicao>{
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/patrimonio-disponivel`).pipe(take(1));
  }

  private obterQuantidadeMovimentacoes(): Observable<DadosRequisicao>{
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/quantidade-movimentacao`).pipe(take(1));
  }

  public obterEstatisticas(): Observable<any[]> {

    const estatisticaCategoria = this.obterEstatisticasCategoria();
    const mediaEquipamento = this.obterMediaEquipamentoPorFuncionario();
    const patrimoniosDisponiveis = this.obterPatrimonioDisponivel();
    const quantidadeMovimentacoes = this.obterQuantidadeMovimentacoes();

    return forkJoin([estatisticaCategoria, mediaEquipamento, patrimoniosDisponiveis, quantidadeMovimentacoes]);

  }

}
