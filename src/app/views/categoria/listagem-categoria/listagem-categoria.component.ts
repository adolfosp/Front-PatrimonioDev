import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import {ConfiguracaoSpinner} from "@nvs-utils/configuracao-spinner";
import configuracaoTabela from '@nvs-utils/configuracao-tabela';
import { Router } from '@angular/router';
import { Categoria } from '@nvs-models/Categoria';
import Paginacao from "@nvs-models/dtos/Paginacao";
import Componente from '@nvs-models/Componente';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { TokenService } from '@nvs-services/token/token.service';
import { API, APIDefinition, Columns, Config, Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Title } from "@angular/platform-browser";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";

@Component({
  selector: 'app-listagem-categoria',
  templateUrl: './listagem-categoria.component.html',
  styleUrls: ['./listagem-categoria.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ListagemCategoriaComponent extends Componente implements OnInit, AfterViewInit  {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public confSpinner = ConfiguracaoSpinner;
  public configuracao: Config;
  public colunas: Columns[];
  public data: Categoria[] = [];

  public categorias: Categoria[] = [];
  public codigoCategoria: number;
  public ehAdministrador = false;

  public dataFiltradaExcel: Categoria[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();
  public totalItensPaginacao: number;
  public paginacao: Pagination;
  public modalRef?: BsModalRef;
  public readonly rotaCadastro = "/dashboard/categoria";

  constructor(
    private categoriaService: CategoriaService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef,
    private title: Title

  ) {
    title.setTitle("Listagem de categoria")
    super();

  }

  ngOnInit(): void {

    this.configuracao = configuracaoTabela();

    this.colunas = this.obterColunasDaTabela();
    this.paginacao = configuracaoPaginacao
    this.obterCategorias();
    this.ehAdministrador = this.token.ehUsuarioAdministrador();
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
    this.obterCategorias();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public obterCategorias(): void {
    this.spinner.show("buscando");
    const paginacao = new Paginacao(this.paginacao.offset, this.paginacao.limit);

    this.categoriaService.obterRegistros(paginacao).subscribe({
      next: (dados: DadosRequisicao) => {
        const categorias = dados.data.registros as Categoria[];
        this.data = categorias
        this.dataFiltradaExcel = categorias;
        this.totalItensPaginacao = dados.data.quantidadePagina * this.paginacao.limit;

      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao buscar pelas categorias");
      },
      complete: () => {
        this.detectorAlteracao.markForCheck();
      }
    }).add(() => this.spinner.hide("buscando"));
  }

  public abrirModal(event: any, template: TemplateRef<any>, codigoCategoria: number): void {
    event.stopPropagation();
    this.codigoCategoria = codigoCategoria;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmar(): void {

    this.modalRef?.hide();
    this.spinner.show("excluindo");

    this.categoriaService.remover(this.codigoCategoria).subscribe({
      next: () => {
        this.mostrarAvisoSucesso("Categoria removida com sucesso!")
        this.obterCategorias();
      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao excluir a categoria");
      }
    }).add(() => this.spinner.hide("excluindo"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarFabricantes(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarFabricantes(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (categoria: Categoria) =>
        categoria.codigoCategoria.toString().indexOf(valor) !== -1 ||
        categoria.descricao.toLocaleLowerCase().indexOf(valor) !== -1
    );
  }

  public detalheCategoria(codigoCategoria: number): void {
    this.router.navigate([`dashboard/categoria/${codigoCategoria}`])
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'categorias');

      XLSX.writeFile(wb, 'categorias.xlsx');
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoCategoria', title: 'Código', width: '3%' },
      { key: 'descricao', title: 'Descrição' },
      { key: '', title: 'Editar' },
      { key: '', title: 'Excluir' },
    ];
  }
  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: 'descricao', title: 'Descrição' },
        { key: '', title: 'Expandir' },
      ];
    } else {
      this.colunas = this.obterColunasDaTabela();
    }
  }

  @HostListener('window:resize', [])
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
