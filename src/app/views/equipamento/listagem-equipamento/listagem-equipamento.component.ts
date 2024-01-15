import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import Componente from "@nvs-models/Componente";
import { Equipamento } from "@nvs-models/Equipamento";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { EquipamentoService } from "@nvs-services/equipamento/equipamento.service";
import { TokenService } from "@nvs-services/token/token.service";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { ConfiguracaoSpinner } from "@nvs-utils/configuracao-spinner";
import configuracaoTabela from "@nvs-utils/configuracao-tabela";
import { API, APIDefinition, Columns, Config, Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";
import { Confirmable } from "src/app/core/decorators/confirm.decorator";
import * as XLSX from "xlsx";

@Component({
  templateUrl: "./listagem-equipamento.component.html",
  styleUrls: ["./listagem-equipamento.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ListagemEquipamentoComponent extends Componente implements OnInit, AfterViewInit {
  @ViewChild("table", { static: true }) table: APIDefinition;
  public confSpinner = ConfiguracaoSpinner;

  public configuracao: Config;
  public colunas: Columns[];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public data: Equipamento[] = [];
  public dataFiltradaExcel: Equipamento[] = [];
  public ehAdministrador = false;
  public readonly rotaCadastro = "/dashboard/equipamento";
  public paginacao: Pagination;
  public totalItensPaginacao: number;

  constructor(
    private equipamentoService: EquipamentoService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef,
    private title: Title,
  ) {
    super();
    this.title.setTitle("Listagem de equipamento");
  }

  ngOnInit(): void {
    this.paginacao = configuracaoPaginacao;

    this.obterEquipamentos();
    this.ehAdministrador = this.token.ehUsuarioAdministrador();

    this.configuracao = configuracaoTabela();
    this.linhas = this.data.map((_) => _.codigoTipoEquipamento).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();
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
    this.obterEquipamentos();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private obterEquipamentos(): void {
    const paginacao = new PaginacaoDto(this.paginacao.offset, this.paginacao.limit);

    this.spinner.show("buscando");

    this.equipamentoService
      .obterRegistros(paginacao)
      .subscribe({
        next: (dados: DadosRequisicao) => {
          const equipamentos = dados.data.registros as Equipamento[];
          this.data = equipamentos;
          this.dataFiltradaExcel = equipamentos;
          this.totalItensPaginacao = dados.data.quantidadePagina * this.paginacao.limit;
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao carregar os equipamentos.");
        },
        complete: () => {
          this.detectorAlteracao.markForCheck();
        },
      })
      .add(() => this.spinner.hide("buscando"));
  }

  @Confirmable()
  public confirmar(equipamentoId: number): void {
    this.spinner.show("excluindo");

    this.equipamentoService
      .remover(equipamentoId)
      .subscribe({
        next: () => {
          this.mostrarAvisoSucesso("Equipamento excluído com sucesso!");
          this.obterEquipamentos();
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao excluir o equipamento.");
        },
      })
      .add(() => this.spinner.hide("excluindo"));
  }

  public detalheEquipamento(codigoEquipamento: number): void {
    this.router.navigate([`dashboard/equipamento/${codigoEquipamento}`]);
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarEquipamentos(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarEquipamentos(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (equipamento: Equipamento) =>
        equipamento.codigoTipoEquipamento.toString().indexOf(valor) !== -1 ||
        equipamento.tipoEquipamento.toLocaleLowerCase().indexOf(valor) !== -1 ||
        equipamento.nomeFabricante.toLocaleLowerCase().indexOf(valor) !== -1 ||
        equipamento.nomeCategoria.toLocaleLowerCase().indexOf(valor) !== -1,
    );
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Equipamentos");

      XLSX.writeFile(wb, "equipamentos.xlsx");
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: "codigoTipoEquipamento", title: "Código" },
      { key: "tipoEquipamento", title: "Descrição" },
      { key: "nomeFabricante", title: "Fabricante" },
      { key: "nomeFabricante", title: "Categoria" },
      { key: "", title: "Editar" },
      { key: "", title: "Excluir" },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: "tipoEquipamento", title: "Descrição" },
        { key: "", title: "Expandir" },
      ];
    } else {
      this.colunas = this.obterColunasDaTabela();
    }
  }

  @HostListener("window:resize", [])
  onResize(): void {
    this.checkView();
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
