import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Categoria } from '@nvs-models/Categoria';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { TokenService } from '@nvs-services/token/token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import configuracaoTabela from '../../../utils/configuracao-tabela';

@Component({
  selector: 'app-listagem-categoria',
  templateUrl: './listagem-categoria.component.html',
  styleUrls: ['./listagem-categoria.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ListagemCategoriaComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

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

  modalRef?: BsModalRef;

  constructor(
              private categoriaService: CategoriaService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private toaster: ToastrService,
              private router: Router,
              private token: TokenService,
              private detectorAlteracao: ChangeDetectorRef
              ) { }

  ngOnInit(): void {

    this.configuracao = configuracaoTabela();
    this.colunas = this.obterColunasDaTabela();

    this.obterCategorias();
    this.ehAdministrador = this.token.ehUsuarioAdministrador();
    this.checkView();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public obterCategorias(): void {
    this.spinner.show("buscando");
    this.categoriaService.obterTodasCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.data = categorias;
        this.dataFiltradaExcel = categorias;
      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelas categorias. Mensagem ${template.mensagemErro}`, template.titulo);

      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();
      }
    }).add(() => this.spinner.hide("buscando"));
  }

  public abrirModal(event: any, template: TemplateRef<any>, codigoCategoria: number): void {
    event.stopPropagation();
    this.codigoCategoria = codigoCategoria;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmar(): void {

    this.modalRef?.hide();
    this.spinner.show("excluindo");

    this.categoriaService.deletarCategoria(this.codigoCategoria).subscribe(
      () =>{
        this.toaster.success('Categoria removida com sucesso!', 'Excluindo');
        this.obterCategorias();
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao excluir a categoria. Mensagem ${template.mensagemErro}`, template.titulo);
      }
    ).add(()=>this.spinner.hide("excluindo"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public onChange(event: Event): void {
    let valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarFabricantes(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarFabricantes(valor: any): void{
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
     this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
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
