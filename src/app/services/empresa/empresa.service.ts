import { Injectable } from '@angular/core';
import { Empresa } from '@nvs-models/Empresa';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  baseUrl = `${environment.apiUrl}empresas`;

  constructor(private api: ApiService) { }

  public obterEmpresas(): Observable<Empresa[]>{
    return this.api.get<Empresa[]>(this.baseUrl).pipe(take(1))
  }

  public cadastrarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.api.post<Empresa>(this.baseUrl, {empresa}).pipe(take(1));
  }

  public obterEmpresaPadrao(): Observable<string> {
    return this.api.get<string>(`${this.baseUrl}/empresaPadrao`).pipe(take(1));
  }

  public deletarEmpresa(codigoEmpresa: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${codigoEmpresa}`)
    .pipe(take(1));
  }

  public obterApenasUmaEmpresa(codigoEmpresa: number): Observable<Empresa> {
    return this.api.get<Empresa>(`${this.baseUrl}/${codigoEmpresa}`).pipe(take(1));
  }

  public atualizarEmpresa(empresa: Empresa): Observable<Empresa>{
    return this.api
    .put<Empresa>(`${this.baseUrl}/${empresa.codigoEmpresa}`, {empresa})
    .pipe(take(1));
  }

}
