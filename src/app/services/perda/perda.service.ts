import { Injectable } from '@angular/core';
import { PerdaEquipamento } from '@nvs-models/PerdaEquipamento';
import { PerdaRelatorio } from '@nvs-models/relatorios/PerdaRelatorio';
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
    return this.api.post<PerdaEquipamento>(this.baseUrl, {perdaEquipamento}).pipe(take(1));
  }

  public obterPerdas(): Observable<PerdaRelatorio[]>{
    return this.api.get<PerdaRelatorio[]>(this.baseUrl).pipe(take(1));
  }
}
