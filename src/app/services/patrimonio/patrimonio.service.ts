import { Injectable } from '@angular/core';
import { InformacaoAdicional } from '@nvs-models/InformacaoAdicional';
import { Patrimonio } from '@nvs-models/Patrimonio';
import { ApiService } from '@nvs-services/api/api.service';
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  baseUrl = `${environment.apiUrl}patrimonios`;

  constructor(private api: ApiService) { }

  public obterPatrimonios(): Observable<Patrimonio[]>{
    return this.api.get<Patrimonio[]>(this.baseUrl).pipe(take(1));
  }

  public cadastrarPatrimonio(patrimonio: Patrimonio, informacaoAdicional: InformacaoAdicional): Observable<Patrimonio> {
    return this.api
    .post<Patrimonio>(this.baseUrl, {patrimonio: patrimonio, informacaoAdicional: informacaoAdicional})
    .pipe(take(1));
  }

  public excluirPatrimonio(patrimonioId: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${patrimonioId}`)
    .pipe(take(1));
  }

  public obterApenasUmPatrimonio(patrimonioId: number): Observable<any>{
    return this.api
    .get(`${this.baseUrl}/${patrimonioId}`)
    .pipe(take(1));
  }

  private obterInformacaoAdicional(codigoPatrimonio: number): Observable<InformacaoAdicional>{
    return this.api.get<InformacaoAdicional>(`${environment.apiUrl}informacoes/${codigoPatrimonio}`).pipe(take(1));
  }

  private obterEmpresaPadrao():  Observable<string>{
    return this.api.get<string>(`${environment.apiUrl}empresas/empresaPadrao`, {responseType: 'text'}).pipe(take(1));
  }

  public atualizarPatrimonio(patrimonio: Patrimonio, informacaoAdicional: InformacaoAdicional): Observable<Patrimonio>{
    return this.api
    .put<Patrimonio>(`${this.baseUrl}/${patrimonio.codigoPatrimonio}`, {patrimonio: patrimonio, informacaoAdicional: informacaoAdicional})
    .pipe(take(1));
  }

  public obterPatrimonioEInformacaoAdicional(codigoPatrimonio: number): Observable<any[]> {

    let respostaPatrimonio = this.obterApenasUmPatrimonio(codigoPatrimonio);
    let respostaInformacaoAdicional = this.obterInformacaoAdicional(codigoPatrimonio);
    let respostaEmpresaPadrao = this.obterEmpresaPadrao();

    return forkJoin([respostaPatrimonio, respostaInformacaoAdicional, respostaEmpresaPadrao]);

  }

}
