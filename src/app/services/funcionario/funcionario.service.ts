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
export class FuncionarioService implements IService {
  baseUrl = `${environment.apiUrl}funcionarios`;

  constructor(private api: ApiService) {}
  cadastrar<T>(funcionario: T): Observable<DadosRequisicao> {
    return this.api.post<DadosRequisicao>(this.baseUrl, { funcionario }).pipe(take(1));
  }

  obterRegistros(paginacao: Paginacao): Observable<DadosRequisicao> {
    return this.api
      .get<DadosRequisicao>(
        `${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
      )
      .pipe(take(1));
  }

  remover(codigoFuncionario: number): Observable<DadosRequisicao> {
    return this.api.delete<DadosRequisicao>(`${this.baseUrl}/${codigoFuncionario}`).pipe(take(1));
  }

  obterRegistro(codigoFuncionario: number): Observable<DadosRequisicao> {
    return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoFuncionario}`).pipe(take(1));
  }

  atualizar<T>(funcionario: T): Observable<DadosRequisicao> {
    return this.api
      .put<DadosRequisicao>(`${this.baseUrl}/${funcionario["codigoFuncionario"]}`, { funcionario })
      .pipe(take(1));
  }

  //   public cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
  //   }

  //   public obterTodosFuncionarios(): Observable<DadosRequisicao> {
  //     return this.api.get<DadosRequisicao>(this.baseUrl).pipe(take(1));
  //   }

  //   public desativarFuncionario(codigoFuncionario: number): Observable<any> {
  //     return this.api.delete(`${this.baseUrl}/${codigoFuncionario}`).pipe(take(1));
  //   }

  //   public obterApenasUmFuncionario(codigoFuncionario: number): Observable<DadosRequisicao> {
  //     return this.api.get<DadosRequisicao>(`${this.baseUrl}/${codigoFuncionario}`).pipe(take(1));
  //   }

//   public atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
//     return this.api.put<Funcionario>(`${this.baseUrl}/${funcionario.codigoFuncionario}`, { funcionario }).pipe(take(1));
//   }
}
