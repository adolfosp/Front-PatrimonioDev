import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Componente from '@nvs-models/Componente';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { Equipamento } from '@nvs-models/Equipamento';
import { EquipamentoService } from '@nvs-services/equipamento/equipamento.service';
import { TokenService } from '@nvs-services/token/token.service';
import configuracaoTabela from '@nvs-utils/configuracao-tabela';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';

@Component({
  templateUrl: './listagem-equipamento.component.html',
  styleUrls: ['./listagem-equipamento.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListagemEquipamentoComponent extends Componente implements OnInit {


  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public data: Equipamento[] = [];
  public dataFiltradaExcel: Equipamento[] = [];
  public equipamentoId = 0;
  public ehAdministrador = false;

  modalRef?: BsModalRef;

  constructor(
    private equipamentoService: EquipamentoService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef
    ) {
      super();
     }

  ngOnInit(): void {

    this.obterEquipamentos();
    this.ehAdministrador = this.token.ehUsuarioAdministrador()

    this.configuracao = configuracaoTabela()
    this.linhas = this.data.map((_) => _.codigoTipoEquipamento).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();

  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public abrirModal(event: any, template: TemplateRef<any>, equipamentoId: number): void {
    event.stopPropagation();
    this.equipamentoId = equipamentoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private obterEquipamentos(): void {

    this.spinner.show("buscando")

    this.equipamentoService.obterTodosEquipamentos().subscribe({
      next: (dados: DadosRequisicao) => {
        this.data = dados.data as Equipamento[];
        this.dataFiltradaExcel = dados.data as Equipamento[];

      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao carregar os equipamentos.");
      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();
      }
    }).add(() => this.spinner.hide("buscando"));

  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("excluindo");

    this.equipamentoService.deletarEquipamento(this.equipamentoId).subscribe(
      () =>{
        this.mostrarAvisoSucesso("Equipamento excluído com sucesso!");
        this.obterEquipamentos();
      },
      (error: unknown) =>{
        this.mostrarAvisoErro(error, "Houve um erro ao excluir o equipamento.");
      }
    ).add(()=> this.spinner.hide("excluindo"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalheEquipamento(codigoEquipamento : number): void {
    this.router.navigate([`dashboard/equipamento/${codigoEquipamento}`])
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarEquipamentos(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarEquipamentos(valor: any): void{
    this.dataFiltradaExcel = this.data.filter(
      (equipamento: Equipamento) =>
       equipamento.codigoTipoEquipamento.toString().indexOf(valor) !== -1 ||
       equipamento.tipoEquipamento.toLocaleLowerCase().indexOf(valor) !== -1 ||
       equipamento.nomeFabricante.toLocaleLowerCase().indexOf(valor) !== -1 ||
       equipamento.nomeCategoria.toLocaleLowerCase().indexOf(valor) !== -1
    );
  }

  public exportarParaExcel(): void {
     try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Equipamentos');

      XLSX.writeFile(wb, 'equipamentos.xlsx');
    } catch (err) {
      this.mostrarAvisoXLS(`Não foi possível exportar a planilha. Mensagem: ${err}`);
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoTipoEquipamento', title: 'Código' },
      { key: 'tipoEquipamento', title: 'Descrição' },
      { key: 'nomeFabricante', title: 'Fabricante' },
      { key: 'nomeFabricante', title: 'Categoria' },
      { key: '', title: 'Editar' },
      { key: '', title: 'Excluir' },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: 'tipoEquipamento', title: 'Descrição' },
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
