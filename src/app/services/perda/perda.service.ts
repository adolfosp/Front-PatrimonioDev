import { Injectable } from '@angular/core';
import { PerdaEquipamento } from '@nvs-models/PerdaEquipamento';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerdaService {

  baseUrl = `${environment.apiUrl}perdas`;

  constructor(private api: ApiService) { }

  public cadastrarPerda(perdaEquipamento: PerdaEquipamento): Observable<PerdaEquipamento>{
    return this.api.post<PerdaEquipamento>(this.baseUrl, {perdaEquipamentoDto: perdaEquipamento}).pipe(take(1));
  }

  public obterPerdas(): Observable<DadosRequisicao>{
    return this.api.get<DadosRequisicao>(this.baseUrl).pipe(take(1));
  }
}
