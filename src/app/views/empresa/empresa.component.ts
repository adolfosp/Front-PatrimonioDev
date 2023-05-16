import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import Componente from "@nvs-models/Componente";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { Empresa } from "@nvs-models/Empresa";
import { EmpresaService } from "@nvs-services/empresa/empresa.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls: ["./empresa.component.sass", "../../../assets/style-base.sass"],
})
export class EmpresaComponent extends Componente implements OnInit {
  private _empresa = {} as Empresa;
  private _codigoEmpresa: number;
  private _limpandoCampo = false;

  public form!: FormGroup;
  public estadoSalvar = "cadastrarEmpresa";
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private empresaService: EmpresaService,
    private activateRouter: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarEmpresa();
  }

  public limparCampos(): void {
    this._limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoEmpresa: new FormControl(this._limpandoCampo ? this.form.get("codigoEmpresa").value : 0, []),
      nomeFantasia: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]),
      cnpj: new FormControl("", [Validators.required, Validators.minLength(18), Validators.maxLength(18)]),
      razaoSocial: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]),
      empresaPadraoImpressao: new FormControl(false),
    });
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizarEmpresa";
    const nomeAcaoRealizada = atualizando ? "atualizada" : "cadastrada";

    this.spinner.show(nomeAcaoRealizada);

    this._empresa =
      this.estadoSalvar === "cadastrarEmpresa"
        ? { ...this.form.value }
        : { codigoEmpresa: this._empresa.codigoEmpresa, ...this.form.value };
    this.empresaService[this.estadoSalvar](this._empresa)
      .subscribe(
        () => this.mostrarAvisoSucesso(`Empresa ${nomeAcaoRealizada} com sucesso`),
        (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "empresa", ["o", "da"])}`,
          );
        },
        () => {
          setTimeout(() => {
            this.router.navigate(["dashboard/empresa/listagem"]);
          }, 1700);
        },
      )
      .add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarEmpresa(): void {
    this._codigoEmpresa = +this.activateRouter.snapshot.paramMap.get("codigoEmpresa");
    if (this._codigoEmpresa !== null && this._codigoEmpresa !== 0) {
      this.estadoSalvar = "atualizarEmpresa";
      this.spinner.show("carregando");

      this.empresaService
        .obterRegistro(this._codigoEmpresa)
        .subscribe({
          next: (dados: DadosRequisicao) => {
            this._empresa = { ...dados.data };
            this.form.patchValue(this._empresa);
          },
          error: (error: unknown) => {
            this.mostrarAvisoErro(error, "Houve um problema ao carregar a empresa.");
          },
        })
        .add(() => this.spinner.hide("carregando"));
    }
  }
}
