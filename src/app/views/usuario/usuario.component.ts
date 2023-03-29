import { Component, OnInit, ViewChild } from "@angular/core";
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
import { EmpresaService } from "@nvs-services/empresa/empresa.service";
import { PermissaoService } from "@nvs-services/permissao/permissao.service";
import { SetorService } from "@nvs-services/setor/setor.service";
import { UsuarioService } from "@nvs-services/usuario/usuario.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSelect } from "@angular/material/select";
import { Pagination } from "ngx-easy-table";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { quantidadeBuscaPorVezSelect } from "@nvs-utils/configuracao-paginacao";

import Paginacao from "@nvs-models/dtos/Paginacao";
import { SelectService } from "@nvs-services/componente/select-service";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.sass", "../../../assets/style-base.sass"],
})
export class UsuarioComponent extends Componente implements OnInit {
  @ViewChild("selectEmpresa", { read: MatSelect }) selectEmpresa: MatSelect;

  private _codigoUsuario: number;
  private _usuario = {} as Usuario;
  private _paginacaoSelectEmpresa: Pagination;

  public form!: FormGroup;
  public estadoSalvar = "cadastrarUsuario";
  public setores: Setor[] = [];
  public empresas: Empresa[] = [];
  public permissoes: UsuarioPermissao[] = [];
  public limpandoCampo = false;
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;
  public readonly metodoCarregarEmpresa = "carregarEmpresa";

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private setorService: SetorService,
    private empresaService: EmpresaService,
    private permissaoService: PermissaoService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activateRouter: ActivatedRoute,
    private selectService: SelectService,
  ) {
    super();
    this._paginacaoSelectEmpresa = configuracaoPaginacao;
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarUsuario();
    this.carregarSetor();
    this[this.metodoCarregarEmpresa]();
    this.carregarPermissao();
    this.controlarVisibilidadeCampoAtivo();
  }

  onSelectAberto(event: any, select: string, nomeMetodo: string) {
    if (!event) return;

    this[select].panel.nativeElement.addEventListener("scroll", () => {
      if (!this.selectService.deveObterMaisRegistros(event, this[select])) return;

      const paginacao = this.selectService.ObterPaginacao(this._paginacaoSelectEmpresa);
      this[nomeMetodo](paginacao);
    });
  }

  private controlarVisibilidadeCampoAtivo(): void {
    if (this.estadoSalvar == "cadastrarUsuario") this.form.controls["ativo"].disable();
    else this.form.controls["ativo"].enable();
  }

  private carregarSetor(): void {
    this.setorService.obterSetor().subscribe({
      next: (dados: DadosRequisicao) => {
        this.setores = dados.data as Setor[];
      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao carregar o setor.");
      },
    });
  }

  private carregarEmpresa(paginacaoBase: Paginacao = null): void {
    let paginacaoEmpresa = new Paginacao(this._paginacaoSelectEmpresa.offset, this._paginacaoSelectEmpresa.limit);

    if (paginacaoBase !== null) paginacaoEmpresa = paginacaoBase;

    this.empresaService.obterEmpresas(paginacaoEmpresa).subscribe({
      next: (dados: DadosRequisicao) => {
        this.empresas = dados.data.registros as Empresa[];
      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao carregar a empresa.");
      },
    });
  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }

  private carregarPermissao(): void {
    this.permissaoService.obterPermissoes().subscribe({
      next: (dados: DadosRequisicao) => {
        this.permissoes = dados.data as UsuarioPermissao[];
      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao carregar a permissão.");
      },
    });
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
    const atualizando = this.estadoSalvar == "atualizarUsuario";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "cadastrado";

    this.spinner.show(nomeAcaoRealizada);

    this._usuario =
      this.estadoSalvar === "cadastrarUsuario"
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
    this._codigoUsuario = +this.activateRouter.snapshot.paramMap.get("codigoUsuario");
    if (this._codigoUsuario !== null && this._codigoUsuario !== 0) {
      this.estadoSalvar = "atualizarUsuario";
      this.spinner.show("carregando");

      this.usuarioService
        .obterApenasUmUsuario(this._codigoUsuario)
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
