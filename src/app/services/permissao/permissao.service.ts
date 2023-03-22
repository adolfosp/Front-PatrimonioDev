import { Injectable } from '@angular/core';
import { UsuarioPermissao } from '@nvs-models/UsuarioPermissao';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {
  baseUrl = `${environment.apiUrl}permissoes`;

  constructor(private api: ApiService) { }

  public obterPermissoes(): Observable<DadosRequisicao>{
    return this.api.get<DadosRequisicao>(this.baseUrl).pipe(take(1));
  }

  public cadastrarPermissao(usuarioPermissao: UsuarioPermissao): Observable<UsuarioPermissao> {
    return this.api
    .post<UsuarioPermissao>(this.baseUrl, {perfilDto: usuarioPermissao})
    .pipe(take(1));
  }

  public desativarPermissao(permissaoId: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${permissaoId}`)
    .pipe(take(1));
  }

  public obterApenasUmaPermissao(permissaoId: number): Observable<any>{
    return this.api
    .get(`${this.baseUrl}/${permissaoId}`)
    .pipe(take(1));
  }

  public atualizarPermissao(usuarioPermissao: UsuarioPermissao): Observable<UsuarioPermissao>{
    return this.api
    .put<UsuarioPermissao>(`${this.baseUrl}/${usuarioPermissao.codigoPerfil}`, {usuarioPermissao})
    .pipe(take(1));
  }

}
