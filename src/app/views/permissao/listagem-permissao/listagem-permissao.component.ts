import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import Componente from "@nvs-models/Componente";
import { DadosRequisicao } from "@nvs-models/DadosRequisicao";
import { UsuarioPermissao } from "@nvs-models/UsuarioPermissao";
import { PermissaoService } from "@nvs-services/permissao/permissao.service";
import { TokenService } from "@nvs-services/token/token.service";
import configuracaoTabela from "@nvs-utils/configuracao-tabela";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { API, APIDefinition, Columns, Config } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from "xlsx";

@Component({
  templateUrl: "./listagem-permissao.component.html",
  styleUrls: ["./listagem-permissao.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemPermissaoComponent extends Componente implements OnInit {
  @ViewChild("table", { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public data: UsuarioPermissao[] = [];
  public dataFiltradaExcel: UsuarioPermissao[] = [];
  public permissaoId = 0;
  public ehAdministrador = false;

  modalRef?: BsModalRef;

  constructor(
    private permissaoService: PermissaoService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.obterPermissoes();
    this.ehAdministrador = this.token.ehUsuarioAdministrador();

    this.configuracao = configuracaoTabela();
    this.linhas = this.data.map((_) => _.codigoPerfil).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public abrirModal(event: any, template: TemplateRef<any>, permissaoId: number): void {
    event.stopPropagation();
    this.permissaoId = permissaoId;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  private obterPermissoes(): void {
    this.spinner.show("buscando");

    this.permissaoService
      .obterPermissoes()
      .subscribe({
        next: (dados: DadosRequisicao) => {
          const permissoes = dados.data as UsuarioPermissao[];
          this.data = permissoes
          this.dataFiltradaExcel = permissoes;
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao carregar as permissões.");
        },
        complete: () => {
          this.detectorAlteracao.markForCheck();
        },
      })
      .add(() => this.spinner.hide("buscando"));
  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("desativando");

    this.permissaoService
      .desativarPermissao(this.permissaoId)
      .subscribe({
        next: () => {
          this.mostrarAvisoSucesso("Permissão desativada com sucesso!");
          this.obterPermissoes();
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao desativar a permissão.");
        },
      })
      .add(() => this.spinner.hide("desativando"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalhePermissao(codigoPermissao: number): void {
    this.router.navigate([`dashboard/permissao/${codigoPermissao}`]);
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarPermissoes(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarPermissoes(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (permissao: UsuarioPermissao) =>
        permissao.codigoPerfil.toString().indexOf(valor) !== -1 ||
        permissao.descricaoPerfil.toLocaleLowerCase().indexOf(valor) !== -1,
    );
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Permissoes");

      XLSX.writeFile(wb, "permissoes.xlsx");
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: "codigoPerfil", title: "Código" },
      { key: "descricaoPerfil", title: "Nome" },
      { key: "ativo", title: "Situação" },
      { key: "", title: "Editar" },
      { key: "", title: "Desativar" },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: "descricaoPerfil", title: "Nome" },
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
