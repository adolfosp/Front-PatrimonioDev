import { Injectable } from "@angular/core";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { IService } from "@nvs-models/interfaces/IService";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { ApiService } from "@nvs-services/api/api.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsuarioService implements IService {
  baseUrl = `${environment.apiUrl}usuarios`;

  constructor(private api: ApiService) {}
  cadastrar<T>(usuario: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, { usuario }).pipe(take(1));
  }

  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
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
}
