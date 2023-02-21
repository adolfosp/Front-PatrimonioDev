import { Injectable } from '@angular/core';
import { DadosRequisicao } from '@nvs-models/DadosRequisicao';
import { Setor } from '@nvs-models/Setor';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()

export class SetorService  {

  baseUrl = `${environment.apiUrl}setores`;

  constructor(private api: ApiService) {
  }

  public cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.api
    .post<Setor>(this.baseUrl, {setor})
    .pipe(take(1));
  }

  public obterSetor(): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(this.baseUrl).pipe(take(1));
  }

  public obterApenasUmSetor(codigoSetor: number): Observable<Setor> {
    return this.api.get<Setor>(`${this.baseUrl}/${codigoSetor}`).pipe(take(1));
  }

  public deletarSetor(setorId: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${setorId}`)
    .pipe(take(1));
  }

  public atualizarSetor(setor: Setor): Observable<Setor>{
    return this.api
    .put<Setor>(`${this.baseUrl}/${setor.codigoSetor}`, {setor})
    .pipe(take(1));
  }

}
