import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import Componente from "@nvs-models/Componente";
import { Funcionario } from "@nvs-models/Funcionario";
import { Setor } from "@nvs-models/Setor";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { FuncionarioService } from "@nvs-services/funcionario/funcionario.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";

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
    private spinner: NgxSpinnerService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private title: Title
  ) {
    super();
    this.paginacaoSelectSetor = configuracaoPaginacao;
    this.title.setTitle("Listagem de funcionários");
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarFuncionario();
    this.controlarVisibilidadeCampoAtivo();
  }

  public limparCampos(): void {
    this._limpandoCampo = true;
    this.validacao();
  }


  private controlarVisibilidadeCampoAtivo(): void {
    if (this.estadoSalvar == "cadastrar") this.form.controls["ativo"].disable();
    else this.form.controls["ativo"].enable();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoFuncionario: new FormControl<number>(this._limpandoCampo ? this.form.get("codigoFuncionario").value : 0, []),
      nomeFuncionario: new FormControl<string>("", [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      ativo: new FormControl<boolean>(true),
      codigoSetor: new FormControl<number>(0, [Validators.required]),
      observacao: new FormControl<string>(""),
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
