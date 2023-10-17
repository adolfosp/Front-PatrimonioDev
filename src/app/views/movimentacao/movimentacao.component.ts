import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import Componente from "@nvs-models/Componente";
import { Movimentacao } from "@nvs-models/Movimentacao";
import { MovimentacaoEquipamento } from "@nvs-models/enums/movimentacao-equipamento.enum";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { CriptografiaService } from "@nvs-services/criptografia/criptografia.service";
import { MovimentacaoService } from "@nvs-services/movimentacao/movimentacao.service";
import { TokenService } from "@nvs-services/token/token.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-movimentacao",
  templateUrl: "./movimentacao.component.html",
  styleUrls: ["./movimentacao.component.sass", "../../../assets/style-base.sass"],
})
export class MovimentacaoComponent extends Componente implements OnInit {
  private _nomePatrimonio: string;
  private _movimentacao = {} as Movimentacao;
  private _codigoMovimentacao = 0;
  private _limpandoCampo = false;
  private _codigoPatrimonio: number;

  public form!: FormGroup;
  public estadoSalvar = "realizarMovimentacao";
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  public chaveSituacaoMovimento: any;
  public situacaoMovimentoEnum = MovimentacaoEquipamento;
  public valorSituacaoMovimento = "2";

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private movimentacaoService: MovimentacaoService,
    private token: TokenService,
    private encriptacao: CriptografiaService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
    this.chaveSituacaoMovimento = Object.keys(this.situacaoMovimentoEnum).filter(Number);
    this.activatedRoute.queryParams.subscribe((parametro) => {
      this._codigoPatrimonio = +this.encriptacao.decrypt(parametro["codigoPatrimonio"]);
      this._nomePatrimonio = parametro["nomePatrimonio"];
    });
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarMovimentacao();
  }

  public limparCampos(): void {
    this._limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoMovimentacao: new FormControl(this._limpandoCampo ? this.form.get("codigoMovimentacao").value : 0, []),
      dataApropriacao: new FormControl("", [Validators.required]),
      dataDevolucao: new FormControl(""),
      observacao: new FormControl(""),
      movimentacaoDoEquipamento: new FormControl(+MovimentacaoEquipamento["Em Uso"], [Validators.required]),
      codigoPatrimonio: new FormControl(this._codigoPatrimonio),
      codigoUsuario: new FormControl(this.token.obterCodigoUsuarioToken()),
      nomeUsuario: new FormControl(this.token.obterNomeUsuarioToken()),
      patrimonio: new FormControl(this._nomePatrimonio),
    });
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizarMovimentacao";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "realizada";

    this.spinner.show(nomeAcaoRealizada);

    this._movimentacao =
      this.estadoSalvar === "realizarMovimentacao"
        ? { ...this.form.value }
        : { codigoMovimentacao: this._movimentacao.codigoMovimentacao, ...this.form.value };

    this.formatarDatas();
    this.converterEnumEquipamentoParaNumeros();

    this.movimentacaoService[this.estadoSalvar](this._movimentacao)
      .subscribe(
        () => this.mostrarAvisoSucesso(`Movimentação ${nomeAcaoRealizada} com sucesso`),
        (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "usuário", ["o", "do"])}`,
          );
        },
        () => {
          setTimeout(() => {
            this.router.navigate(["dashboard/patrimonio/listagem"]);
          }, 1700);
        },
      )
      .add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private formatarDatas(): void {
    const dataApropriacao = this.form.controls["dataApropriacao"].value;
    const dataDevolucao = this.form.controls["dataDevolucao"].value;

    this._movimentacao.dataApropriacao = new Date(moment(dataApropriacao).subtract(3, "hours").toISOString());

    if (typeof dataDevolucao != "undefined") {
      this._movimentacao.dataDevolucao = moment(dataDevolucao).local().subtract(3, "hours").toISOString();
    }
  }

  private converterEnumEquipamentoParaNumeros(): void {
    this._movimentacao.movimentacaoDoEquipamento = +this.form.controls["movimentacaoDoEquipamento"].value;
  }

  public carregarMovimentacao(): void {
    this.activatedRoute.queryParams.subscribe((parametro) => {
      this._codigoMovimentacao = parametro["codigoMovimentacao"];
    });

    if (typeof this._codigoMovimentacao !== "undefined" && this._codigoMovimentacao !== 0) {
      this.estadoSalvar = "atualizarMovimentacao";
      this.spinner.show("carregando");

      this.movimentacaoService
        .obterApenasUmaMovimentacao(this._codigoMovimentacao)
        .subscribe({
          next: (dados: DadosRequisicao) => {
            this._movimentacao = { ...(dados.data as Movimentacao) };
            this.form.patchValue(this._movimentacao);
            this.valorSituacaoMovimento = this._movimentacao.movimentacaoDoEquipamento.toString();
            this.form.controls["patrimonio"].setValue(`${dados.data.tipoEquipamento} - ${dados.data.nomeFuncionario}`);
          },
          error: (error: unknown) => {
            this.mostrarAvisoErro(error, "Houve um erro ao tentar carregar a movimentação.");
          },
        })
        .add(() => this.spinner.hide("carregando"));
    }
  }
}
