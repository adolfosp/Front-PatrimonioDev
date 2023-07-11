import { Component, OnInit } from "@angular/core";
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import { ValidacaoCampoSenha } from "@nvs-helpers/ValidacaoSenhaHelper";
import Componente from "@nvs-models/Componente";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { Empresa } from "@nvs-models/Empresa";
import { Setor } from "@nvs-models/Setor";
import { Usuario } from "@nvs-models/Usuario";
import { UsuarioPermissao } from "@nvs-models/UsuarioPermissao";
import { UsuarioService } from "@nvs-services/usuario/usuario.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "ngx-easy-table";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.sass", "../../../assets/style-base.sass"],
})
export class UsuarioComponent extends Componente implements OnInit {
  private _codigoUsuario: number;
  private _usuario = {} as Usuario;

  public paginacaoSelectEmpresa: Pagination;
  public paginacaoSelectSetor: Pagination;
  public paginacaoSelectPerfil: Pagination;

  public form!: FormGroup;
  public estadoSalvar = "cadastrar";
  public setores: Setor[] = [];
  public empresas: Empresa[] = [];
  public permissoes: UsuarioPermissao[] = [];
  public limpandoCampo = false;
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;
  campo: any;

  get f(): any {
    return this.form.controls;
  }

  get controlEmpresa() {
    return this.form.controls["codigoEmpresa"] as FormControl;
  }

  get controlSetor() {
    return this.form.controls["codigoSetor"] as FormControl;
  }

  get controlPerfil() {
    return this.form.controls["codigoPerfil"] as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activateRouter: ActivatedRoute,
  ) {
    super();
    this.paginacaoSelectEmpresa = configuracaoPaginacao;
    this.paginacaoSelectSetor = configuracaoPaginacao;
    this.paginacaoSelectPerfil = configuracaoPaginacao;

  }

  ngOnInit(): void {
    this.validacao();
    this.carregarUsuario();
    this.controlarVisibilidadeCampoAtivo();
  }

  private controlarVisibilidadeCampoAtivo(): void {
    if (this.estadoSalvar === "cadastrar") this.form.controls["ativo"].disable();
    else this.form.controls["ativo"].enable();
  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidacaoCampoSenha.MustMatch("senha", "confirmeSenha"),
    };

    this.form = this.fb.group(
      {
        codigoUsuario: new FormControl(this.limpandoCampo ? this.form.get("codigoUsuario").value : 0, []),
        codigoPerfil: new FormControl("", [Validators.required]),
        codigoEmpresa: new FormControl("", [Validators.required]),
        codigoSetor: new FormControl("", [Validators.required]),
        nome: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
        email: new FormControl("", [Validators.required, Validators.minLength(10), Validators.email]),
        confirmeSenha: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        senha: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        ativo: new FormControl(true),
      },
      formOptions,
    );
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizar";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "cadastrado";

    this.spinner.show(nomeAcaoRealizada);

    this._usuario =
      this.estadoSalvar === "cadastrar"
        ? { ...this.form.value }
        : { codigoUsuario: this._usuario.codigoUsuario, ...this.form.value };
    this.usuarioService[this.estadoSalvar](this._usuario)
      .subscribe(
        () => this.mostrarAvisoSucesso(`Usuário ${nomeAcaoRealizada} com sucesso`),
        (error: any) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "usuário", ["o", "do"])}`,
          );
        },
        () => {
          setTimeout(() => {
            this.router.navigate(["dashboard/usuario/listagem"]);
          }, 1700);
        },
      )
      .add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  public carregarUsuario(): void {
    //TODO: atualizar angular para usar a função nova de pegar parâmetro
    this._codigoUsuario = +this.activateRouter.snapshot.paramMap.get("codigoUsuario");
    if (this._codigoUsuario !== null && this._codigoUsuario !== 0) {
      this.estadoSalvar = "atualizar";
      this.spinner.show("carregando");

      this.usuarioService
        .obterRegistro(this._codigoUsuario)
        .subscribe({
          next: (dados: DadosRequisicao) => {
            this._usuario = { ...(dados.data as Usuario) };
            this.form.patchValue(this._usuario);
            this.form.controls["confirmeSenha"].setValue(dados.data.senha);
          },
          error: (error: unknown) => {
            this.mostrarAvisoErro(error, "Houve um erro ao tentar carregar o usuário.");
          },
        })
        .add(() => this.spinner.hide("carregando"));
    }
  }
}
