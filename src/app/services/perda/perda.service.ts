import { Injectable } from '@angular/core';
import PaginacaoDto from '@nvs-models/dtos/PaginacaoDto';
import { IService } from '@nvs-models/interfaces/IService';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

type ICustomizeService = Pick<IService, "cadastrar" | "obterRegistros">;

@Injectable({
  providedIn: "root",
})
export class PerdaService implements ICustomizeService {
  baseUrl = `${environment.apiUrl}perdas`;

  constructor(private api: ApiService) {}
  cadastrar<T>(perdaEquipamento: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, { perdaEquipamentoDto: perdaEquipamento }).pipe(take(1));
  }

  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
    return this.api
      .get<DadosRequisicao>(
        `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
      )
      .pipe(take(1));
  }
}
