import { Injectable } from '@angular/core';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IService } from '@nvs-models/interfaces/IService';
import PaginacaoDto from '@nvs-models/dtos/PaginacaoDto';

@Injectable()
export class SetorService implements IService {
  baseUrl = `${environment.apiUrl}setores`;

  constructor(private api: ApiService) {}
    cadastrar<T>(setor: T): Observable<DadosRequisicao> {
        return this.api.post<DadosRequisicao>(this.baseUrl, { setor }).pipe(take(1));
    }
    obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
        return this.api
          .get<DadosRequisicao>(
            `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
          )
          .pipe(take(1));
    }
    remover(setorId: number): Observable<DadosRequisicao> {
        return this.api.delete<DadosRequisicao>(`${this.baseUrl}/${setorId}`).pipe(take(1));
    }
    obterRegistro(codigoSetor: number): Observable<DadosRequisicao> {
        return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoSetor}`).pipe(take(1));
    }
    atualizar<T>(setor: T): Observable<DadosRequisicao> {
        return this.api.put<DadosRequisicao>(`${this.baseUrl}/${setor["codigoSetor"]}`, { setor }).pipe(take(1));
    }
}
