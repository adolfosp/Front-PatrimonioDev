import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Title } from "@angular/platform-browser";
import Componente from "@nvs-models/Componente";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { PerdaRelatorio } from "@nvs-models/relatorios/PerdaRelatorio";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { PerdaService } from "@nvs-services/perda/perda.service";
import { TokenService } from "@nvs-services/token/token.service";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { ConfiguracaoSpinner } from "@nvs-utils/configuracao-spinner";
import configuracaoTabela from "@nvs-utils/configuracao-tabela";
import { API, APIDefinition, Columns, Config, Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from "xlsx";

@Component({
  selector: "app-relatorio-perda",
  templateUrl: "./relatorio-perda.component.html",
  styleUrls: ["./relatorio-perda.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RelatorioPerdaComponent extends Componente implements OnInit, AfterViewInit {
  @ViewChild("table", { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: PerdaRelatorio[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public dataFiltradaExcel: PerdaRelatorio[] = [];
  public funcionarios: PerdaRelatorio[] = [];
  public ehAdministrador = false;
  public confSpinner = ConfiguracaoSpinner;
  public paginacao: Pagination;
  public totalItensPaginacao: number;

  constructor(
    private token: TokenService,
    private spinner: NgxSpinnerService,
    private perdaService: PerdaService,
    private detectorAlteracao: ChangeDetectorRef,
    private title: Title,
  ) {
    super();
    this.title.setTitle("Listagem de perdas");
    this.paginacao = configuracaoPaginacao;
  }

  ngOnInit(): void {
    this.ehAdministrador = this.token.ehUsuarioAdministrador();
    this.obterPerdas();

    this.configuracao = configuracaoTabela();
    this.linhas = this.data.map((_) => _.codigoPerda).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
  }

  ngAfterViewInit(): void {
    this.totalItensPaginacao = this.table.apiEvent({
      type: API.getPaginationTotalItems,
    });
    this.detectorAlteracao.detectChanges();
  }

  paginationEvent($event: PageEvent): void {
    this.paginacao = {
      ...this.paginacao,
      limit: $event.pageSize,
      offset: $event.pageIndex + 1,
      count: $event.length,
    };
    this.obterPerdas();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private obterPerdas(): void {
    const paginacao = new PaginacaoDto(this.paginacao.offset, this.paginacao.limit);

    this.spinner.show("buscando");

    this.perdaService
      .obterRegistros(paginacao)
      .subscribe({
        next: (dados: DadosRequisicao) => {
          const relatorio = dados.data.registros as PerdaRelatorio[];
          this.dataFiltradaExcel = relatorio;
          this.data = relatorio;
          this.totalItensPaginacao = dados.data.quantidadePagina * this.paginacao.limit;
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao buscar pelas perdas.");
        },
        complete: () => {
          this.detectorAlteracao.markForCheck();
        },
      })
      .add(() => this.spinner.hide("buscando"));
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarPerdas(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarPerdas(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (perdas: PerdaRelatorio) =>
        perdas.motivoDaPerda.toString().indexOf(valor) !== -1 ||
        perdas.codigoPerda.toString().indexOf(valor) !== -1 ||
        perdas.nomeFuncionario.toString().indexOf(valor) !== -1 ||
        perdas.nomeUsuario.toString().indexOf(valor) !== -1,
    );
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Perdas");

      XLSX.writeFile(wb, "perdas.xlsx");
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  private obterColunasDaTabela(): any {
    return [{ key: "motivoDaPerda", title: "Perda" }];
  }

  onRowClickEvent($event: MouseEvent, index: number): void {
    $event.preventDefault();
    this.table.apiEvent({
      type: API.toggleRowIndex,
      value: index,
    });
    if (this.toggledRows.has(index)) {
      this.toggledRows.delete(index);
    } else {
      this.toggledRows.add(index);
    }
  }
}
