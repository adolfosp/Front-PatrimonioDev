import { Injectable } from "@angular/core";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { ApiService } from "@nvs-services/api/api.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { IService } from "@nvs-models/interfaces/IService";
import Paginacao from "@nvs-models/dtos/Paginacao";

@Injectable({
  providedIn: "root",
})
export class UsuarioService implements IService {
  baseUrl = `${environment.apiUrl}usuarios`;

  constructor(private api: ApiService) {}
  cadastrar<T>(usuario: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, { usuario }).pipe(take(1));
  }
  obterRegistros(paginacao: Paginacao): Observable<DadosRequisicao> {
    return this.api
      .get<DadosRequisicao>(
        `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
      )
      .pipe(take(1));
  }

  remover(codigoUsuario: number): Observable<DadosRequisicao> {
    return this.api.delete<DadosRequisicao>(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  obterRegistro(codigoUsuario: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  atualizar<T>(usuario: T): Observable<DadosRequisicao> {
    return this.api.put<DadosRequisicao>(`${this.baseUrl}/${usuario["codigoUsuario"]}`, { usuario }).pipe(take(1));
  }

  public obterUsuarioPorEmailESenha(email: string, senha: string, autenticacaoAuth: boolean) {
    return this.api.post<string>(`${this.baseUrl}/${email}/${senha}`, autenticacaoAuth).pipe(take(1));
  }
}
