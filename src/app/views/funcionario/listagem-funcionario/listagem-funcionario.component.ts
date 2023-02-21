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
import { Funcionario } from "@nvs-models/Funcionario";
import { FuncionarioService } from "@nvs-services/funcionario/funcionario.service";
import { TokenService } from "@nvs-services/token/token.service";
import configuracaoTabela from "@nvs-utils/configuracao-tabela";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { API, APIDefinition, Columns, Config } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from "xlsx";

@Component({
  templateUrl: "./listagem-funcionario.component.html",
  styleUrls: ["./listagem-funcionario.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemFuncionarioComponent extends Componente implements OnInit {
  @ViewChild("table", { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Funcionario[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public dataFiltradaExcel: Funcionario[] = [];
  public funcionarios: Funcionario[] = [];
  public funcionarioId = 0;
  public ehAdministrador = false;

  modalRef?: BsModalRef;

  constructor(
    private funcionarioService: FuncionarioService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.ehAdministrador = this.token.ehUsuarioAdministrador();
    this.obterFuncionarios();

    this.configuracao = configuracaoTabela();
    this.linhas = this.data.map((_) => _.codigoFuncionario).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public abrirModal(event: any, template: TemplateRef<any>, funcionarioId: number): void {
    event.stopPropagation();
    this.funcionarioId = funcionarioId;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  private obterFuncionarios(): void {
    this.spinner.show("buscando");

    this.funcionarioService
      .obterTodosFuncionarios()
      .subscribe({
        next: (dados: DadosRequisicao) => {
          const funcionarios = dados.data as Funcionario[];
          this.dataFiltradaExcel = funcionarios;
          this.data = funcionarios;
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

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("desativando");

    this.funcionarioService
      .desativarFuncionario(this.funcionarioId)
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

  public recusar(): void {
    this.modalRef?.hide();
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
