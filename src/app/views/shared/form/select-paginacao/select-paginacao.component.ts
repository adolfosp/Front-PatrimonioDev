import { Attribute, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatSelect } from "@angular/material/select";
import { TipoService } from "@nvs-enum/tipo-service";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { SelectService } from "@nvs-services/componente/select-service";
import { ServiceInjectionFactory } from "@nvs-services/factories/service-injection-factory";
import { Pagination } from "ngx-easy-table";

@Component({
  selector: 'app-select-paginacao',
  templateUrl: './select-paginacao.component.html',
  styleUrls: ['./select-paginacao.component.sass']
})
export class SelectPaginacaoComponent implements OnInit {
	@ViewChild("select", { read: MatSelect }) select: MatSelect;
	@Input() paginacao: Pagination;

	private _service: any;
	public valores: [];

	constructor(
		@Attribute('tipoService') public tipoService: string,
		private selectService: SelectService,
		private serviceFactory: ServiceInjectionFactory,
	) {
        console.log(tipoService)
		this._service = this.serviceFactory.obterIntanciaService(TipoService[tipoService]);
	}

	ngOnInit(): void {
		this.obterRegistros();
	}

	onSelectAberto(event: unknown) {
		this.obterRegistros();
		if (!event) return;

		this.select.panel.nativeElement.addEventListener("scroll", () => {
			if (!this.selectService.deveObterMaisRegistros(event, this.select))
				return;
		});
	}

	private obterRegistros(): void {
		const paginacao = this.selectService.ObterPaginacao(this.paginacao);
		this._service.obterRegistros(paginacao).subscribe({
			next: (value: DadosRequisicao) => {
				this.valores = value.data.registros;
			},
		});
	}
}
