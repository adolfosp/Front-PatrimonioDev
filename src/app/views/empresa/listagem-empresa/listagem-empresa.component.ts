import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    OnInit,
    TemplateRef,
    ViewChild, ViewEncapsulation
} from "@angular/core";
import { Router } from '@angular/router';
import Componente from '@nvs-models/Componente';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { Empresa } from '@nvs-models/Empresa';
import { EmpresaService } from '@nvs-services/empresa/empresa.service';
import { TokenService } from '@nvs-services/token/token.service';
import configuracaoTabela from '@nvs-utils/configuracao-tabela';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config, Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { ConfiguracaoSpinner } from "@nvs-utils/configuracao-spinner";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import PaginacaoDto from "@nvs-models/dtos/PaginacaoDto";
import { PageEvent } from "@angular/material/paginator";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-listarempresa',
  templateUrl: './listagem-empresa.component.html',
  styleUrls: ['./listagem-empresa.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListagemEmpresaComponent extends Componente implements OnInit, AfterViewInit {

  @ViewChild('table', { static: true }) table: APIDefinition;
  public confSpinner = ConfiguracaoSpinner;
  public configuracao: Config;
  public colunas: Columns[];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public data: Empresa[] = [];
  public dataFiltradaExcel: Empresa[] = [];
  public empresaId = 0;
  public ehAdministrador = false;
  public readonly rotaCadastro = "/dashboard/empresa";
  public paginacao: Pagination;
  public totalItensPaginacao: number;

  modalRef?: BsModalRef;

  constructor(
    private empresaService: EmpresaService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef,
    private title: Title) {
    super();
    title.setTitle("Listagem de empresas")
  }

  ngOnInit(): void {

    this.paginacao = configuracaoPaginacao;
    this.obterEmpresas();
    this.ehAdministrador = this.token.ehUsuarioAdministrador()

    this.configuracao = configuracaoTabela()
    this.linhas = this.data.map((_) => _.codigoEmpresa).reduce((acc, cur) => cur + acc, 0);

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
        this.obterEmpresas();
    }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public abrirModal(event: any, template: TemplateRef<any>, empresaId: number): void {
    event.stopPropagation();
    this.empresaId = empresaId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private obterEmpresas(): void {

    this.spinner.show("buscando");
    const paginacao = new PaginacaoDto(this.paginacao.offset, this.paginacao.limit);

    this.empresaService.obterRegistros(paginacao).subscribe({
      next: (dados: DadosRequisicao) => {

          const empresa = dados.data.registros as Empresa[];
          this.data = empresa
          this.dataFiltradaExcel = empresa;
          this.totalItensPaginacao = dados.data.quantidadePagina * this.paginacao.limit;

      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao carregar as empresas");
      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();
      }
    }).add(() => this.spinner.hide("buscando"));

  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("excluindo");

    this.empresaService.remover(this.empresaId).subscribe({
      next: () =>{
        this.mostrarAvisoSucesso("Empresa excluída com sucesso!");
        this.obterEmpresas();
      },
      error: (error: unknown) =>{
        this.mostrarAvisoErro(error, "Houve um erro ao excluir a empresa")
      }
    }).add(()=> this.spinner.hide("excluindo"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalheEmpresa(codigoEmpresa : number): void {
    this.router.navigate([`dashboard/empresa/${codigoEmpresa}`])
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarEmpresas(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarEmpresas(valor: any): void{
    this.dataFiltradaExcel = this.data.filter(
      (empresa: Empresa) =>
       empresa.codigoEmpresa.toString().indexOf(valor) !== -1 ||
       empresa.razaoSocial.toLocaleLowerCase().indexOf(valor) !== -1 ||
       empresa.nomeFantasia.toLocaleLowerCase().indexOf(valor) !== -1 ||
       empresa.cnpj.toLocaleLowerCase().indexOf(valor) !== -1
    );
  }

  public exportarParaExcel(): void {
     try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Empresas');

      XLSX.writeFile(wb, 'empresas.xlsx');
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoEmpresa', title: 'Código', width: '10%' },
      { key: 'razaoSocial', title: 'Razão Social' },
      { key: 'nomeFantasia', title: 'Nome Fantasia' },
      { key: 'empresaoPadraoImpressao', title: 'Empresa Impressão' },
      { key: 'cnpj', title: 'CNPJ' },
      { key: '', title: 'Editar' },
      { key: '', title: 'Excluir' },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
      { key: 'razaoSocial', title: 'Razão Social' },
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
