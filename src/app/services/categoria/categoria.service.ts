import { Injectable } from '@angular/core';
import { Categoria } from '@nvs-models/Categoria';
import { DadosRequisicao } from '@nvs-models/DadosRequisicao';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl = `${environment.apiUrl}categorias`;

  constructor(private api: ApiService) { }

  public cadastrarCategoria(categoria: Categoria): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, {categoria}).pipe(take(1));
  }

  public obterTodasCategorias(): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(this.baseUrl).pipe(take(1));
  }

  public deletarCategoria(codigoCategoria: number): Observable<DadosRequisicao>{
    return this.api
    .delete<DadosRequisicao>(`${this.baseUrl}/${codigoCategoria}`)
    .pipe(take(1));
  }

  public obterApenasUmaCategoria(codigoCategoria: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoCategoria}`).pipe(take(1));
  }

  public atualizarCategoria(categoria: Categoria): Observable<DadosRequisicao>{
    return this.api
    .put<DadosRequisicao>(`${this.baseUrl}/${categoria.codigoCategoria}`, {categoria})
    .pipe(take(1));
  }
}
