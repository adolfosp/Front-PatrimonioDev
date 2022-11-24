import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimentacaoEquipamento } from '@nvs-enum/movimentacao-equipamento.enum';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Movimentacao } from '@nvs-models/Movimentacao';
import { CriptografiaService } from '@nvs-services/criptografia/criptografia.service';
import { MovimentacaoService } from '@nvs-services/movimentacao/movimentacao.service';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import configuracaoTabela from '../../../utils/configuracao-tabela';

@Component({
  selector: 'app-listagem-movimentacao',
  templateUrl: './listagem-movimentacao.component.html',
  styleUrls: ['./listagem-movimentacao.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListagemMovimentacaoComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public data: Movimentacao[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();
  public colunas: Columns[];

  private codigoPatrimonio: number;
  public movimentacoes: Movimentacao[] = [];

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private movimentacaoService: MovimentacaoService,
    private activatedRoute: ActivatedRoute,
    private encriptacao: CriptografiaService,
    private detectorAlteracao: ChangeDetectorRef
  ) { }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.obterMovimentacoes();
    this.configuracao = configuracaoTabela()
    this.colunas = this.obterColunasDaTabela();

    this.linhas = this.data.map((_) => _.codigoMovimentacao).reduce((acc, cur) => cur + acc, 0);
  }

  public obterDescricaoEnum(index: number): string {
    return MovimentacaoEquipamento[index];
  }

  public onChange(event: Event): void {
    let valorDigitado = (event.target as HTMLInputElement).value;

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: 'codigoMovimentacao', title: 'Código' },
        { key: 'nomeFuncionario', title: 'Funcionário' },
        { key: 'nomeUsuario', title: 'Usuário' },
        { key: '', title: 'Expandir' },
      ];
    } else {
      this.colunas = this.obterColunasDaTabela();
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoMovimentacao', title: 'Código', width: '1%' },
      { key: 'dataApropriacao', title: 'Data apro.', width: '15%' },
      { key: 'dataDevolucao', title: 'Data dev.', width: '15%' },
      { key: 'nomeUsuario', title: 'Usuário' },
      { key: 'nomeFuncionario', title: 'Funcionário' },
      { key: '', title: 'Editar' },
    ];
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

  private obterMovimentacoes(): void {
    this.activatedRoute.queryParams.subscribe(parametro => {this.codigoPatrimonio = +this.encriptacao.decrypt(parametro['codigoPatrimonio']) })

    this.spinner.show("buscando");

    this.movimentacaoService.obterTodasMovimentacoesDoPatrimonio(this.codigoPatrimonio).subscribe({
      next: (movimentacoes: Movimentacao[]) => {
        this.movimentacoes = movimentacoes;
        this.data = movimentacoes;
      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelas movimentações. Mensagem ${template.mensagemErro}`, 'Erro');

      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();
      }

    }).add(() => this.spinner.hide("buscando"));
  }

  public detalheMovimentacao(codigoMovimentacao: number): void {
    this.router.navigate([`dashboard/movimentacao`], { queryParams: { codigoMovimentacao } })
  }
}
