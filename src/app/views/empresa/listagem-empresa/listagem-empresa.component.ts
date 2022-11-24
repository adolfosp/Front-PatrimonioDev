import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Empresa } from '@nvs-models/Empresa';
import { EmpresaService } from '@nvs-services/empresa/empresa.service';
import { TokenService } from '@nvs-services/token/token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import configuracaoTabela from '../../../utils/configuracao-tabela';

@Component({
  selector: 'app-listarempresa',
  templateUrl: './listagem-empresa.component.html',
  styleUrls: ['./listagem-empresa.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListagemEmpresaComponent implements OnInit {

  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public data: Empresa[] = [];
  public dataFiltradaExcel: Empresa[] = [];
  public empresaId: number = 0;
  public ehAdministrador = false;

  modalRef?: BsModalRef;

  constructor(
    private empresaService: EmpresaService,
    private modalService: BsModalService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    this.obterEmpresas();
    this.ehAdministrador = this.token.ehUsuarioAdministrador()

    this.configuracao = configuracaoTabela()
    this.linhas = this.data.map((_) => _.codigoEmpresa).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();

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

    this.spinner.show("buscando")

    this.empresaService.obterEmpresas().subscribe({
      next: (empresa: Empresa[]) => {
        this.data = empresa;
        this.dataFiltradaExcel = empresa;

      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao carregar as empresas. Mensagem ${template.mensagemErro}`, template.titulo);

      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();
      }
    }).add(() => this.spinner.hide("buscando"));

  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("excluindo");

    debugger;
    this.empresaService.deletarEmpresa(this.empresaId).subscribe(
      () =>{
        this.toaster.success('Empresa excluída com sucesso!', 'Exclusão');
        this.obterEmpresas();
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao excluir a empresa. Mensagem ${template.mensagemErro}`, template.titulo);
      }
    ).add(()=> this.spinner.hide("excluindo"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalheEmpresa(codigoEmpresa : number): void {
    this.router.navigate([`dashboard/empresa/${codigoEmpresa}`])
  }

  public onChange(event: Event): void {
    let valorDigitado = (event.target as HTMLInputElement).value;
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
      this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoEmpresa', title: 'Código', width: '3%' },
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
