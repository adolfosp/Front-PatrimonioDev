import { Attribute, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { RegistroNeutroLabel } from "@nvs-enum/registro-neutro-label.enum";
import { TipoService } from "@nvs-models/enums/tipo-service.enum";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { RegistroNeutro } from "@nvs-models/types/registro-neutro.type";
import { SelectService } from "@nvs-services/componente/select.service";
import { ServiceInjectionFactory } from "@nvs-services/factories/service-injection-factory";
import { Pagination } from "ngx-easy-table";

@Component({
  selector: "app-select-paginacao",
  templateUrl: "./select-paginacao.component.html",
  styleUrls: ["./select-paginacao.component.sass", "../../../../../assets/style-base.sass"],
})
export class SelectPaginacaoComponent implements OnInit {
  @ViewChild("select", { read: MatSelect }) select: MatSelect;
  @Input() paginacao: Pagination;
  @Input() control: FormControl;

  private _service: any;
  private _tipoServico: TipoService;
  public valores: RegistroNeutro[];
  public label: string;

  constructor(
    @Attribute("tipoService") public tipoService: string,
    private selectService: SelectService,
    private serviceFactory: ServiceInjectionFactory,
  ) {
    this._tipoServico = TipoService[tipoService];
    this.label = this.tipoService;
    this._service = this.serviceFactory.obterIntanciaService(this._tipoServico);
  }

  ngOnInit(): void {
    this.obterRegistros();
  }

  onSelectAberto(event: unknown) {
    if (!event) return;

    this.select.panel.nativeElement.addEventListener("scroll", () => {
      if (!this.selectService.deveObterMaisRegistros(event, this.select)) return;

      this.obterRegistros();
    });
  }

  private obterRegistros(): void {
    const paginacao = this.selectService.ObterPaginacao(this.paginacao);
    this._service.obterRegistros(paginacao).subscribe({
      next: (value: DadosRequisicao) => {
        this.valores = this.montarNovoTipo(value.data.registros);
      },
    });
  }

  private montarNovoTipo(registros: any[]): RegistroNeutro[] {
    return registros.map((obj) => {
      const novoTipo = {} as RegistroNeutro;
      Object.entries(obj).forEach(([key, value]) => {
        if (key.startsWith("codigo")) {
          novoTipo.codigo = value as number;
        }
        if (key === RegistroNeutroLabel[this._tipoServico]) {
          novoTipo.descricao = value as string;
        }
      });
      return novoTipo;
    });
  }
}
