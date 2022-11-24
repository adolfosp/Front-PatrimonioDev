import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Fabricante } from '@nvs-models/Fabricante';
import { FabricanteService } from '@nvs-services/fabricante/fabricante.service';
import { TokenService } from '@nvs-services/token/token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import configuracaoTabela from '../../../utils/configuracao-tabela';

@Component({
  selector: 'app-listarFabricante',
  templateUrl: './listagem-fabricante.component.html',
  styleUrls: ['./listagem-fabricante.component.sass', '../../../../assets/style-listagem.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListagemFabricanteComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Fabricante[] = [];

  public fabricantes: Fabricante[] = [];
  public codigoFabricante: number;
  public ehAdministrador = false;

  public dataFiltradaExcel: Fabricante[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  modalRef?: BsModalRef;

  constructor(
              private fabricanteService: FabricanteService,
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

    this.obterFabricante();
    this.ehAdministrador = this.token.ehUsuarioAdministrador();
    this.checkView();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public obterFabricante(): void {
    this.spinner.show("buscando");
    this.fabricanteService.obterTodosFabricante().subscribe({
      next: (fabricantes: Fabricante[]) => {
        this.data = fabricantes;
        this.dataFiltradaExcel = fabricantes;
      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelos fabricantes. Mensagem ${template.mensagemErro}`, template.titulo);

      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();
      }
    }).add(() => this.spinner.hide("buscando"));
  }

  public abrirModal(event: any, template: TemplateRef<any>, codigoFabricante: number): void {
    event.stopPropagation();
    this.codigoFabricante = codigoFabricante;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmar(): void {

    this.modalRef?.hide();
    this.spinner.show("excluindo");

    this.fabricanteService.deletarFabricante(this.codigoFabricante).subscribe(
      () =>{
        this.toaster.success('Fabricante removido com sucesso!', 'Excluindo');
        this.obterFabricante();
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao excluir o fabricante. Mensagem ${template.mensagemErro}`, template.titulo);
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
      (fabricante: Fabricante) =>
       fabricante.codigoFabricante.toString().indexOf(valor) !== -1 ||
       fabricante.nomeFabricante.toLocaleLowerCase().indexOf(valor) !== -1
    );
  }


  public detalheFabricante(codigoFabricante: number): void {
    this.router.navigate([`dashboard/fabricante/${codigoFabricante}`])
  }

  public exportarParaExcel(): void {
    try {
     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'fabricantes');

     XLSX.writeFile(wb, 'fabricantes.xlsx');
   } catch (err) {
     this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
   }
 }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoFabricante', title: 'Código' },
      { key: 'nomeFabricante', title: 'Nome' },
      { key: '', title: 'Editar' },
      { key: '', title: 'Excluir' },
    ];
  }
  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: 'codigoFabricante', title: 'Código' },
        { key: 'nomeFabricante', title: 'Nome' },
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
