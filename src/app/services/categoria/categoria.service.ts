import { Injectable } from "@angular/core";
import { ApiService } from "@nvs-services/api/api.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { IService } from "@nvs-models/interfaces/IService";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements IService {
	baseUrl = `${environment.apiUrl}categorias`;

	constructor(private api: ApiService) {}
	cadastrar<T>(categoria: T): Observable<DadosRequisicao> {
		return this.api
			.post<DadosRequisicao>(this.baseUrl, { categoria })
			.pipe(take(1));
	}
	obterRegistros(paginacao: PaginacaoDto): Observable<DadosRequisicao> {
		return this.api
			.get<DadosRequisicao>(
				`${this.baseUrl}?paginaAtual=${paginacao.paginaAtual}&quantidadePorPagina=${paginacao.quantidadePorPagina}`,
			)
			.pipe(take(1));
	}
	remover(codigoCategoria: number): Observable<DadosRequisicao> {
		return this.api
			.delete<DadosRequisicao>(`${this.baseUrl}/${codigoCategoria}`)
			.pipe(take(1));
	}
	obterRegistro(codigoCategoria: number): Observable<DadosRequisicao> {
		return this.api
			.get<DadosRequisicao>(`${this.baseUrl}/${codigoCategoria}`)
			.pipe(take(1));
	}

	atualizar<T>(categoria: T): Observable<DadosRequisicao> {
		return this.api
			.put<DadosRequisicao>(`${this.baseUrl}/${categoria["codigoCategoria"]}`, {
				categoria,
			})
			.pipe(take(1));
	}
}
