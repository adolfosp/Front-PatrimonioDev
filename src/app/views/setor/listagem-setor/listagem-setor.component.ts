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
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { Setor } from "@nvs-models/Setor";
import { SetorService } from "@nvs-services/setor/setor.service";
import { TokenService } from "@nvs-services/token/token.service";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { ConfiguracaoSpinner } from "@nvs-utils/configuracao-spinner";
import configuracaoTabela from "@nvs-utils/configuracao-tabela";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { API, APIDefinition, Columns, Config, Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from "xlsx";

@Component({
  selector: "app-listagem-setor",
  templateUrl: "./listagem-setor.component.html",
  styleUrls: ["./listagem-setor.component.sass"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemSetorComponent extends Componente implements OnInit, AfterViewInit {
  @ViewChild("table", { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Setor[] = [];
  public innerWidth: number;
  public toggledRows = new Set<number>();
  public readonly rotaCadastro = "/dashboard/setor";
  public totalItensPaginacao: number;
  public confSpinner = ConfiguracaoSpinner;

  public dataFiltradaExcel: Setor[] = [];
  public setores: Setor[] = [];
  public setorId = 0;
  public ehAdministrador = false;
  public paginacao: Pagination;

  modalRef?: BsModalRef;

  constructor(
    private setorService: SetorService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef,
    private title: Title
  ) {
    super();
    this.title.setTitle("Listagem de setor")
  }

  ngOnInit(): void {
    this.paginacao = configuracaoPaginacao;

    this.ehAdministrador = this.token.ehUsuarioAdministrador();
    this.obterSetores();

    this.configuracao = configuracaoTabela();

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
    this.obterSetores();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public abrirModal(event: any, template: TemplateRef<any>, setorId: number): void {
    event.stopPropagation();
    this.setorId = setorId;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  private obterSetores(): void {
    this.spinner.show("buscando");

    const paginacao = new PaginacaoDto(this.paginacao.offset, this.paginacao.limit);

    this.setorService
      .obterRegistros(paginacao)
      .subscribe({
        next: (dados: DadosRequisicao) => {
          const setor = dados.data.registros as Setor[];
          this.dataFiltradaExcel = setor;
          this.data = setor;
          this.totalItensPaginacao = dados.data.quantidadePagina * this.paginacao.limit;
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao buscar pelo setores.");
        },
        complete: () => {
          this.detectorAlteracao.markForCheck();
        },
      })
      .add(() => this.spinner.hide("buscando"));
  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("excluindo");

    this.setorService
      .remover(this.setorId)
      .subscribe({
        next: () => {
          this.mostrarAvisoSucesso("Setor removido com sucesso!");
          this.obterSetores();
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao remover o setor.");
        },
      })
      .add(() => this.spinner.hide("excluindo"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalheSetor(codigoSetor: number): void {
    this.router.navigate([`dashboard/setor/${codigoSetor}`]);
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarSetores(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarSetores(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (setor: Setor) =>
        setor.codigoSetor.toString().indexOf(valor) !== -1 || setor.nome.toLocaleLowerCase().indexOf(valor) !== -1,
    );
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Setores");

      XLSX.writeFile(wb, "setores.xlsx");
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: "codigoSetor", title: "Código" },
      { key: "nome", title: "Nome" },
      { key: "", title: "Editar" },
      { key: "", title: "Excluir" },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: "codigoSetor", title: "Código" },
        { key: "nome", title: "Nome" },
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
