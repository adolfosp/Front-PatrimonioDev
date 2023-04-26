import Paginacao from "@nvs-models/dtos/Paginacao";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { Observable } from "rxjs";

export interface IService {
	cadastrar<T>(classe: T): Observable<DadosRequisicao>;
	obterRegistros(paginacao: Paginacao): Observable<DadosRequisicao>;
	remover(codigo: number): Observable<DadosRequisicao>;
	obterRegistro(codigoCategoria: number): Observable<DadosRequisicao>;
	atualizar<T>(categoria: T): Observable<DadosRequisicao>;
}
