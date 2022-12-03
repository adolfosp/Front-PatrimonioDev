import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimentacaoEquipamento } from '@nvs-enum/movimentacao-equipamento.enum';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Movimentacao } from '@nvs-models/Movimentacao';
import { CriptografiaService } from '@nvs-services/criptografia/criptografia.service';
import { MovimentacaoService } from '@nvs-services/movimentacao/movimentacao.service';
import { TokenService } from '@nvs-services/token/token.service';
import { CLASSE_BOTAO_LIMPAR } from '@nvs-utils/classes-sass.constant';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.sass', '../../../assets/style-base.sass']
})
export class MovimentacaoComponent implements OnInit {


  private nomePatrimonio: string;
  private movimentacao = {} as Movimentacao;
  private codigoMovimentacao = 0;
  private limpandoCampo = false;
  private codigoPatrimonio: number;

  public form!: FormGroup;
  public estadoSalvar = 'realizarMovimentacao';
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;


  public chaveSituacaoMovimento: any;
  public situacaoMovimentoEnum = MovimentacaoEquipamento;
  public valorSituacaoMovimento = "2";

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private movimentacaoService: MovimentacaoService,
    private token: TokenService,
    private encriptacao: CriptografiaService,
    private activatedRoute: ActivatedRoute) {
    this.chaveSituacaoMovimento = Object.keys(this.situacaoMovimentoEnum).filter(Number);
    this.activatedRoute.queryParams.subscribe(parametro => {
      this.codigoPatrimonio = +this.encriptacao.decrypt(parametro['codigoPatrimonio'])
      this.nomePatrimonio = parametro['nomePatrimonio']
    });
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarMovimentacao();
  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoMovimentacao: new FormControl(this.limpandoCampo ? this.form.get('codigoMovimentacao').value : 0, []),
      dataApropriacao: new FormControl('', [Validators.required]),
      dataDevolucao: new FormControl(''),
      observacao: new FormControl(''),
      movimentacaoDoEquipamento: new FormControl(+MovimentacaoEquipamento['Em Uso'],[Validators.required]),
      codigoPatrimonio: new FormControl(this.codigoPatrimonio),
      codigoUsuario: new FormControl(this.token.obterCodigoUsuarioToken()),
      nomeUsuario: new FormControl(this.token.obterNomeUsuarioToken()),
      patrimonio: new FormControl(this.nomePatrimonio)

    });
  }

  public salvarAlteracao(): void {

    const atualizando = this.estadoSalvar == 'atualizarMovimentacao';
    const nomeAcaoRealizada = atualizando ? 'atualizado' : 'realizada';

    this.spinner.show(nomeAcaoRealizada);

    this.movimentacao = (this.estadoSalvar === 'realizarMovimentacao') ? { ...this.form.value } : { codigoMovimentacao: this.movimentacao.codigoMovimentacao, ...this.form.value };

    this.formatarDatas()
    this.converterEnumEquipamentoParaNumeros()

    this.movimentacaoService[this.estadoSalvar](this.movimentacao).subscribe(
      () => this.toaster.success(`Movimentação ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: unknown) => {
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "usuário", ['o', 'do'])} Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () => {
        setTimeout(() => {
          this.router.navigate(['dashboard/movimentacao/listagem'], { queryParams: {codigoPatrimonio: this.encriptacao.encrypt(this.movimentacao.codigoPatrimonio.toString())}})
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private formatarDatas(): void {

    const dataApropriacao = this.form.controls['dataApropriacao'].value
    const dataDevolucao = this.form.controls['dataDevolucao'].value

    this.movimentacao.dataApropriacao = new Date(moment(dataApropriacao).subtract(3, 'hours').toISOString());

    if (typeof dataDevolucao != 'undefined') {
      this.movimentacao.dataDevolucao = moment(dataDevolucao).local().subtract(3, 'hours').toISOString();
    }

  }

  private converterEnumEquipamentoParaNumeros(): void {
    this.movimentacao.movimentacaoDoEquipamento = +this.form.controls['movimentacaoDoEquipamento'].value
  }

  public carregarMovimentacao(): void {
    this.activatedRoute.queryParams.subscribe(parametro => {this.codigoMovimentacao = parametro['codigoMovimentacao']} );

    if (typeof this.codigoMovimentacao !== 'undefined' && this.codigoMovimentacao !== 0) {
      this.estadoSalvar = 'atualizarMovimentacao';
      this.spinner.show('carregando');

      this.movimentacaoService.obterApenasUmaMovimentacao(this.codigoMovimentacao).subscribe(
        {
          next: (movimentacao: Movimentacao) => {
            this.movimentacao = { ...movimentacao };
            this.form.patchValue(this.movimentacao);
            this.valorSituacaoMovimento = this.movimentacao.movimentacaoDoEquipamento.toString();
            this.form.controls['patrimonio'].setValue(`${movimentacao.tipoEquipamento} - ${movimentacao.nomeFuncionario}`)
          },
          error: (error: unknown) => {
            const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao tentar carregar a movimentação. Mensagem: ${template.mensagemErro}`, template.titulo);
          }
        }
      ).add(() => this.spinner.hide('carregando'));
    }
  }

}
