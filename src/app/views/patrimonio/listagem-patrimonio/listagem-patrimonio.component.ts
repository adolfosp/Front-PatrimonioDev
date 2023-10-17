import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import Componente from "@nvs-models/Componente";
import { Patrimonio } from "@nvs-models/Patrimonio";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { SituacaoEquipamento } from "@nvs-models/enums/situacao-equipamento.enum";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { CriptografiaService } from "@nvs-services/criptografia/criptografia.service";
import { PatrimonioService } from "@nvs-services/patrimonio/patrimonio.service";
import { TokenService } from "@nvs-services/token/token.service";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { ConfiguracaoSpinner } from "@nvs-utils/configuracao-spinner";
import configuracaoTabela from "@nvs-utils/configuracao-tabela";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { API, APIDefinition, Columns, Config, Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from "xlsx";

@Component({
  templateUrl: "./listagem-patrimonio.component.html",
  styleUrls: ["./listagem-patrimonio.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ListagemPatrimonioComponent extends Componente implements OnInit, AfterViewInit {
  @ViewChild("table", { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Patrimonio[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();
  public readonly rotaCadastro = "/dashboard/patrimonio";
  public confSpinner = ConfiguracaoSpinner;

  public dataFiltradaExcel: Patrimonio[] = [];
  public patrimonios: Patrimonio[] = [];
  public patrimonioId = 0;
  public ehAdministrador = false;
  public paginacao: Pagination;
  public totalItensPaginacao: number;

  modalRef?: BsModalRef;

  constructor(
    private patrimonioService: PatrimonioService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private encriptacao: CriptografiaService,
    private detectorAlteracao: ChangeDetectorRef,
    private title: Title,
  ) {
    super();
    this.title.setTitle("Listagem de patrimônio");
    this.paginacao = configuracaoPaginacao;
  }

  ngOnInit(): void {
    this.ehAdministrador = this.token.ehUsuarioAdministrador();
    this.obterPatrimonios();

    this.configuracao = configuracaoTabela();
    this.linhas = this.data.map((_) => _.codigoPatrimonio).reduce((acc, cur) => cur + acc, 0);

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
    this.obterPatrimonios();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 1200;
  }

  public abrirModal(event: any, template: TemplateRef<any>, patrimonioId: number): void {
    event.stopPropagation();
    this.patrimonioId = patrimonioId;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  reciverFeedbackReload() {
    this.obterPatrimonios();
  }

  private obterPatrimonios(): void {
    const paginacao = new PaginacaoDto(this.paginacao.offset, this.paginacao.limit);

    this.spinner.show("buscando");

    this.patrimonioService
      .obterRegistros(paginacao)
      .subscribe({
        next: (dados: DadosRequisicao) => {
          const patrimonio = dados.data.registros as Patrimonio[];
          this.dataFiltradaExcel = patrimonio;
          this.data = patrimonio;
          this.totalItensPaginacao = dados.data.quantidadePagina * this.paginacao.limit;
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao buscar pelos patrimônios.");
        },
        complete: () => {
          this.configuracao.isLoading = false;
          this.detectorAlteracao.markForCheck();
        },
      })
      .add(() => this.spinner.hide("buscando"));
  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("excluindo");

    this.patrimonioService
      .remover(this.patrimonioId)
      .subscribe({
        next: () => {
          this.mostrarAvisoSucesso("Patrimônio excluído com sucesso!");
          this.obterPatrimonios();
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao excluir o patrimônio.");
        },
      })
      .add(() => this.spinner.hide("excluindo"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public fecharModalPerda() {
    const botaoFecharPerda = document.getElementById("botao-fechar-modal-perda");
    botaoFecharPerda.click();
    this.obterPatrimonios();
  }

  public detalhePatrimonio(codigoPatrimonio: number, serviceTag: string): void {
    this.router.navigate([`dashboard/patrimonio`], { queryParams: { codigoPatrimonio, serviceTag } });
  }
  public obterDescricaoEnum(index: number): string {
    return SituacaoEquipamento[index];
  }
  public cadastrarMovimentacao(codigoPatrimonio: number, tipoEquipamento: string, nomeFuncionario: string): void {
    this.router.navigate([`dashboard/movimentacao`], {
      queryParams: {
        codigoPatrimonio: this.encriptacao.encrypt(codigoPatrimonio.toString()),
        nomePatrimonio: `${tipoEquipamento} - ${nomeFuncionario}`,
      },
    });
  }

  public listarTodasAsMovimentacoes(codigoPatrimonio: number): void {
    this.router.navigate([`dashboard/movimentacao/listagem`], {
      queryParams: { codigoPatrimonio: this.encriptacao.encrypt(codigoPatrimonio.toString()) },
    });
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarPatrimonios(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarPatrimonios(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (patrimonios: Patrimonio) =>
        patrimonios.codigoPatrimonio.toString().indexOf(valor) !== -1 ||
        patrimonios.codigoTipoEquipamento.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
        patrimonios.situacaoEquipamento.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
        patrimonios.modelo.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
        patrimonios.nomeFuncionario.toLocaleLowerCase().indexOf(valor) !== -1,
    );
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Patrimonios");

      XLSX.writeFile(wb, "patrimonios.xlsx");
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }


  private obterColunasDaTabela(): any {
    return [
      { key: "codigoPatrimonio", title: "Código", width: "5%" },
      { key: "situacaoEquipamento", title: "Situação", width: "17%" },
      { key: "tipoEquipamento", title: "Equipamento", width: "5%" },
      { key: "nomeFuncionario", title: "Funcionário", width: "45%" },
      { key: "", title: "Editar", width: "10%" },
      { key: "", title: "Excluir", width: "10%" },
      { key: "", title: "Ações", width: "10%" },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: "tipoEquipamento", title: "Equip." },
        { key: "nomeFuncionario", title: "Func." },
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
