import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { Observable } from "rxjs";

export interface IService {
  cadastrar<T>(classe: T): Observable<DadosRequisicao>;
  obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao>;
  remover(codigo: number): Observable<DadosRequisicao>;
  obterRegistro(codigo: number): Observable<DadosRequisicao>;
  atualizar<T>(classe: T): Observable<DadosRequisicao>;
}
