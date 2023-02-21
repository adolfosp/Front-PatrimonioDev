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
import { Usuario } from "@nvs-models/Usuario";
import { TokenService } from "@nvs-services/token/token.service";
import { UsuarioService } from "@nvs-services/usuario/usuario.service";
import configuracaoTabela from "@nvs-utils/configuracao-tabela";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { API, APIDefinition, Columns, Config } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from "xlsx";

@Component({
  selector: "app-listagem-usuario",
  templateUrl: "./listagem-usuario.component.html",
  styleUrls: ["./listagem-usuario.component.sass", "../../../../assets/style-listagem.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemUsuarioComponent extends Componente implements OnInit {
  @ViewChild("table", { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public data: Usuario[] = [];
  public dataFiltradaExcel: Usuario[] = [];

  public ehAdministrador: boolean;

  modalRef?: BsModalRef;
  codigoUsuario: number;

  constructor(
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private detectorAlteracao: ChangeDetectorRef,
    private token: TokenService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.obterUsuario();
    this.configuracao = configuracaoTabela();

    this.linhas = this.data.map((_) => _.codigoSetor).reduce((acc, cur) => cur + acc, 0);
    this.ehAdministrador = this.token.ehUsuarioAdministrador();

    this.colunas = this.obterColunasDaTabela();
    this.checkView();
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: "nome", title: "Nome" },
        { key: "", title: "Expandir" },
      ];
    } else {
      this.colunas = this.obterColunasDaTabela();
    }
  }

  obterColunasDaTabela(): Columns[] {
    return [
      { key: "codigoUsuario", title: "Código", width: "3%" },
      { key: "nome", title: "Nome" },
      { key: "email", title: "E-mail" },
      { key: "", title: "Editar" },
      { key: "", title: "Desativar" },
    ];
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private obterUsuario(): void {
    this.spinner.show("buscando");

    this.usuarioService
      .obterTodosUsuarios()
      .subscribe({
        next: (dados: DadosRequisicao) => {
          const usuarios = dados.data as Usuario[];
          this.data = usuarios;
          this.dataFiltradaExcel = usuarios;
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao buscar pelos usuários.");
        },
        complete: () => {
          this.detectorAlteracao.markForCheck();
        },
      })
      .add(() => this.spinner.hide("buscando"));
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Usuarios");

      XLSX.writeFile(wb, "usuarios.xlsx");
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarUsuarios(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarUsuarios(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (usuario: Usuario) =>
        usuario.codigoUsuario.toString().indexOf(valor) !== -1 ||
        usuario.email.toLocaleLowerCase().indexOf(valor) !== -1 ||
        usuario.nome.toLocaleLowerCase().indexOf(valor) !== -1,
    );
  }

  public confirmar(): void {
    this.modalRef.hide();
    this.spinner.show("desativando");

    this.usuarioService
      .desativarUsuario(this.codigoUsuario)
      .subscribe({
        next: () => {
          this.mostrarAvisoSucesso("Usuário desativado com sucesso!");
          this.obterUsuario();
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um erro ao desativar o usuário.");
        },
      })
      .add(() => this.spinner.hide("desativando"));
  }

  public abrirModal(event: any, template: TemplateRef<any>, codigoUsuario: number): void {
    event.stopPropagation();
    this.codigoUsuario = codigoUsuario;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  public recusar(): void {
    this.modalRef.hide();
  }

  public detalheUsuario(codigoUsuario: number): void {
    this.router.navigate([`dashboard/usuario/${codigoUsuario}`]);
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
