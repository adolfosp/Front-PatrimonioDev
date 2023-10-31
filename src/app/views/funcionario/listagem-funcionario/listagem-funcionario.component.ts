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
import { Funcionario } from "@nvs-models/Funcionario";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { FuncionarioService } from "@nvs-services/funcionario/funcionario.service";
import { TokenService } from "@nvs-services/token/token.service";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { ConfiguracaoSpinner } from "@nvs-utils/configuracao-spinner";
import configuracaoTabela from "@nvs-utils/configuracao-tabela";
import { API, APIDefinition, Columns, Config, Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from "xlsx";

@Component({
  templateUrl: "./listagem-funcionario.component.html",
  styleUrls: ["./listagem-funcionario.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ListagemFuncionarioComponent extends Componente implements OnInit, AfterViewInit {
  @ViewChild("table", { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Funcionario[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();
  public confSpinner = ConfiguracaoSpinner;
  public readonly rotaCadastro = "/dashboard/funcionario";

  public dataFiltradaExcel: Funcionario[] = [];
  public funcionarios: Funcionario[] = [];
  public ehAdministrador = false;
  public paginacao: Pagination;
  public totalItensPaginacao: number;

  constructor(
    private funcionarioService: FuncionarioService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef,
    private title: Title,
  ) {
    super();
    this.title.setTitle("Listagem de funcionários");
  }

  ngOnInit(): void {
    this.paginacao = configuracaoPaginacao;
    this.ehAdministrador = this.token.ehUsuarioAdministrador();
    this.obterFuncionarios();

    this.configuracao = configuracaoTabela();
    this.linhas = this.data.map((_) => _.codigoFuncionario).reduce((acc, cur) => cur + acc, 0);

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
    this.obterFuncionarios();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private obterFuncionarios(): void {
    const paginacao = new PaginacaoDto(this.paginacao.offset, this.paginacao.limit);

    this.spinner.show("buscando");

    this.funcionarioService
      .obterRegistros(paginacao)
      .subscribe({
        next: (dados: DadosRequisicao) => {
          const funcionarios = dados.data.registros as Funcionario[];
          this.dataFiltradaExcel = funcionarios;
          this.data = funcionarios;
          this.totalItensPaginacao = dados.data.quantidadePagina * this.paginacao.limit;
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao buscar pelos funcionários.");
        },
        complete: () => {
          this.detectorAlteracao.markForCheck();
        },
      })
      .add(() => this.spinner.hide("buscando"));
  }

  public confirmar(funcionarioId: number): void {
    this.spinner.show("desativando");

    this.funcionarioService
      .remover(funcionarioId)
      .subscribe({
        next: () => {
          this.mostrarAvisoSucesso("Funcionário desativado com sucesso!");
          this.obterFuncionarios();
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao desativar o funcionário.");
        },
      })
      .add(() => this.spinner.hide("desativando"));
  }


  public detalheFuncionario(codigoFuncionario: number): void {
    this.router.navigate([`dashboard/funcionario/${codigoFuncionario}`]);
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarFuncionarios(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarFuncionarios(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (funcionarios: Funcionario) =>
        funcionarios.codigoFuncionario.toString().indexOf(valor) !== -1 ||
        funcionarios.nomeFuncionario.toLocaleLowerCase().indexOf(valor) !== -1,
    );
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Funcionarios");

      XLSX.writeFile(wb, "funcionarios.xlsx");
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: "codigoFuncionario", title: "Código", width: "3%" },
      { key: "nomeFuncionario", title: "Nome" },
      { key: "ativo", title: "Ativo" },
      { key: "observacao", title: "Observação" },
      { key: "", title: "Editar" },
      { key: "", title: "Desativar" },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: "codigoFuncionario", title: "Código" },
        { key: "nomeFuncionario", title: "Nome" },
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
