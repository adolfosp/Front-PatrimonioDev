import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Setor } from '@nvs-models/Setor';
import { SetorService } from '@nvs-services/setor/setor.service';
import { TokenService } from '@nvs-services/token/token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { DadosRequisicao } from '../../../models/DadosRequisicao';
import configuracaoTabela from '../../../utils/configuracao-tabela';

@Component({
  selector: 'app-listagem-setor',
  templateUrl: './listagem-setor.component.html',
  styleUrls: ['./listagem-setor.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListagemSetorComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Setor[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public dataFiltradaExcel: Setor[] = [];
  public setores: Setor[] = [];
  public setorId = 0;
  public ehAdministrador = false;

  modalRef?: BsModalRef;

  constructor(
    private setorService: SetorService,
    private modalService: BsModalService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef
    ) {

    }

  ngOnInit(): void {

    this.ehAdministrador = this.token.ehUsuarioAdministrador()
    this.obterSetores();

    this.configuracao = configuracaoTabela()
    this.linhas = this.data.map((_) => _.codigoSetor).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public abrirModal(event: any, template: TemplateRef<any>, setorId: number): void {
    event.stopPropagation();
    this.setorId = setorId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private obterSetores(): void {

    this.spinner.show("buscando");

    this.setorService.obterSetor().subscribe({
      next: (dados: DadosRequisicao) => {
        this.dataFiltradaExcel = dados.data as Setor[];
        this.data = dados.data as Setor[];

      },
      error: (error: unknown) => {
        if(error["status"] == 403){
          this.toaster.info(`Você não tem acesso para realizar essa ação!`, 'Informação');

        }
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelo setores. Mensagem ${template.mensagemErro}`, 'Erro');

      },
       complete: () =>{
        this.detectorAlteracao.markForCheck();

      }
    }).add(() => this.spinner.hide("buscando"));

  }

  public confirmar(): void {

    this.modalRef?.hide();
    this.spinner.show("excluindo");

    this.setorService.deletarSetor(this.setorId).subscribe(
      () =>{
        this.toaster.success('Setor removido com sucesso!', 'Deletado');
        this.obterSetores();
      },
      (error: unknown) =>{
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao remover o setor. Mensagem: ${template.mensagemErro}`, 'Erro');
      }
    ).add(() => this.spinner.hide("excluindo"));

  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalheSetor(codigoSetor : number): void {
    this.router.navigate([`dashboard/setor/${codigoSetor}`])
  }

  public onChange(event: Event): void {
    const valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarSetores(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarSetores(valor: any): void{
    this.dataFiltradaExcel = this.data.filter(
      (setor: Setor) =>
       setor.codigoSetor.toString().indexOf(valor) !== -1 ||
       setor.nome.toLocaleLowerCase().indexOf(valor) !== -1
    );
  }

  public exportarParaExcel(): void {
     try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Setores');

      XLSX.writeFile(wb, 'setores.xlsx');
    } catch (err) {
      this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoSetor', title: 'Código' },
      { key: 'nome', title: 'Nome' },
      { key: '', title: 'Editar' },
      { key: '', title: 'Excluir' },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: 'codigoSetor', title: 'Código' },
        { key: 'nome', title: 'Nome' },
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
