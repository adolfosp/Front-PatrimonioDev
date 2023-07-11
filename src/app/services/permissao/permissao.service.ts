import { Injectable } from "@angular/core";
import { ApiService } from "@nvs-services/api/api.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { IService } from "@nvs-models/interfaces/IService";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";

@Injectable({
  providedIn: "root",
})
export class PermissaoService implements IService {
  baseUrl = `${environment.apiUrl}permissoes`;

  constructor(private api: ApiService) {}

  cadastrar<T>(usuarioPermissao: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, { perfilDto: usuarioPermissao }).pipe(take(1));
  }

  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
    return this.api
      .get<DadosRequisicao>(
        `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
      )
      .pipe(take(1));
  }

  remover(permissaoId: number): Observable<DadosRequisicao> {
    return this.api.delete<DadosRequisicao>(`${this.baseUrl}/${permissaoId}`).pipe(take(1));
  }

  obterRegistro(permissaoId: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${permissaoId}`).pipe(take(1));
  }

  atualizar<T>(usuarioPermissao: T): Observable<DadosRequisicao> {
    return this.api
      .put<DadosRequisicao>(`${this.baseUrl}/${usuarioPermissao["codigoPerfil"]}`, { usuarioPermissao })
      .pipe(take(1));
  }
}
