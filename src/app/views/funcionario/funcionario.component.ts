import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import Componente from "@nvs-models/Componente";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { Funcionario } from "@nvs-models/Funcionario";
import { Setor } from "@nvs-models/Setor";
import { FuncionarioService } from "@nvs-services/funcionario/funcionario.service";
import { SetorService } from "@nvs-services/setor/setor.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "ngx-easy-table";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import Paginacao from "@nvs-models/dtos/Paginacao";

@Component({
  selector: "app-funcionario",
  templateUrl: "./funcionario.component.html",
  styleUrls: ["./funcionario.component.sass", "../../../assets/style-base.sass"],
})
export class FuncionarioComponent extends Componente implements OnInit {
  private _funcionario = {} as Funcionario;
  private _codigoFuncionario: number;
  private _limpandoCampo = false;

  public estadoSalvar = "cadastrar";
  public setores: Setor[];
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;
  public form!: FormGroup;
  public paginacaoSelectSetor: Pagination;

  get f(): any {
    return this.form.controls;
  }

  get controlSetor() {
    return this.form.controls["codigoSetor"] as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private setorService: SetorService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activateRouter: ActivatedRoute,
  ) {
    super();
    this.paginacaoSelectSetor = configuracaoPaginacao;
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarFuncionario();
    this.carregarSetor();
    this.controlarVisibilidadeCampoAtivo();
  }

  public limparCampos(): void {
    this._limpandoCampo = true;
    this.validacao();
  }

  private carregarSetor(paginacaoBase: Paginacao = null): void {
    let paginacaoSetor = new Paginacao(this.paginacaoSelectSetor.offset, this.paginacaoSelectSetor.limit);

    if (paginacaoBase !== null) paginacaoSetor = paginacaoBase;

    this.setorService.obterRegistros(paginacaoSetor).subscribe({
      next: (dados: DadosRequisicao) => {
        this.setores = dados.data.registros as Setor[];
      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao carregar o setor.");
      },
    });
  }

  private controlarVisibilidadeCampoAtivo(): void {
    if (this.estadoSalvar == "cadastrar") this.form.controls["ativo"].disable();
    else this.form.controls["ativo"].enable();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoFuncionario: new FormControl(this._limpandoCampo ? this.form.get("codigoFuncionario").value : 0, []),
      nomeFuncionario: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      ativo: new FormControl(true),
      codigoSetor: new FormControl("", [Validators.required]),
      observacao: new FormControl(""),
    });
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizar";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "cadastrado";

    this.spinner.show(nomeAcaoRealizada);

    this._funcionario =
      this.estadoSalvar === "cadastrar"
        ? { ...this.form.value }
        : { codigoFuncionario: this._funcionario.codigoFuncionario, ...this.form.value };

    this.funcionarioService[this.estadoSalvar](this._funcionario)
      .subscribe(
        () => this.mostrarAvisoSucesso(`Funcionário ${nomeAcaoRealizada} com sucesso`),
        (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "funcionário", [
              "o",
              "do",
            ])}`,
          );
        },
        () => {
          setTimeout(() => {
            this.router.navigate(["dashboard/funcionario/listagem"]);
          }, 1700);
        },
      )
      .add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  public carregarFuncionario(): void {
    this._codigoFuncionario = +this.activateRouter.snapshot.paramMap.get("codigoFuncionario");

    if (this._codigoFuncionario !== null && this._codigoFuncionario !== 0) {
      this.estadoSalvar = "atualizar";
      this.spinner.show("carregando");

      this.funcionarioService
        .obterRegistro(this._codigoFuncionario)
        .subscribe({
          next: (dados: DadosRequisicao) => {
            this._funcionario = { ...(dados.data as Funcionario) };
            this.form.patchValue(this._funcionario);
          },
          error: (error: unknown) => {
            this.mostrarAvisoErro(error, "Houve um erro ao tentar carregar o funcionário.");
          },
        })
        .add(() => this.spinner.hide("carregando"));
    }
  }
}
