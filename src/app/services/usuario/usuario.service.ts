import { Injectable } from '@angular/core';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { Usuario } from '@nvs-models/Usuario';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = `${environment.apiUrl}usuarios`

  constructor(private api: ApiService) { }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.api.post<Usuario>(this.baseUrl, {usuario}).pipe(take(1));
  }

  public obterTodosUsuarios(): Observable<DadosRequisicao>{
    return this.api.get<DadosRequisicao>(this.baseUrl).pipe(take(1));
  }

  public obterApenasUmUsuario(codigoUsuario: number): Observable<DadosRequisicao>{
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  public obterUsuarioPorEmailESenha(email: string, senha: string, autenticacaoAuth: boolean){
    return this.api.post<string>(`${this.baseUrl}/${email}/${senha}`, autenticacaoAuth).pipe(take(1));
  }

  public desativarUsuario(codigoUsuario: number){
    return this.api.delete<number>(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  public atualizarUsuario(usuario: Usuario){
    return this.api.put(`${this.baseUrl}/${usuario.codigoUsuario}`,{usuario}).pipe(take(1));
  }
}
