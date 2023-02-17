import { Injectable } from '@angular/core';
import { Equipamento } from '@nvs-models/Equipamento';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DadosRequisicao } from '../../models/DadosRequisicao';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private api: ApiService) { }

  baseUrl = `${environment.apiUrl}equipamentos`;

  public cadastrarEquipamento(equipamento: Equipamento): Observable<Equipamento> {
    return this.api.post<Equipamento>(this.baseUrl, {equipamento}).pipe(take(1));
  }

  public obterTodosEquipamentos(): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(this.baseUrl).pipe(take(1));
  }

  public deletarEquipamento(codigoEquipamento: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${codigoEquipamento}`)
    .pipe(take(1));
  }

  public obterApenasUmEquipamento(codigoEquipamento: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoEquipamento}`).pipe(take(1));
  }

  public atualizarEquipamento(equipamento: Equipamento): Observable<Equipamento>{
    debugger;
    return this.api
    .put<Equipamento>(`${this.baseUrl}/${equipamento.codigoTipoEquipamento}`, {equipamento})
    .pipe(take(1));
  }

}
