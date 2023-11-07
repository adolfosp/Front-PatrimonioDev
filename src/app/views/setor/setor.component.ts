import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";

import { Title } from "@angular/platform-browser";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import { Setor } from "@nvs-models/Setor";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { SetorService } from "@nvs-services/setor/setor.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import Componente from "../../models/Componente";

@Component({
  selector: "app-setor",
  templateUrl: "./setor.component.html",
  styleUrls: ["./setor.component.sass", "../../../assets/style-base.sass"],
})
export class SetorComponent extends Componente implements OnInit {
  private limpandoCampo = false;
  private codigoSetor: number;

  public form!: FormGroup;
  public setor = {} as Setor;
  public estadoSalvar = "cadastrarSetor";
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private spinner: NgxSpinnerService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    super();
    this.title.setTitle("Setor");
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarSetor();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoSetor: new FormControl<number>(this.limpandoCampo ? this.form.get("codigoSetor").value : 0, []),
      nome: new FormControl<string>("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return { "is-invalid": campoForm.errors && campoForm.touched };
  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizarSetor";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "cadastrado";

    this.spinner.show(nomeAcaoRealizada);

    this.setor =
      this.estadoSalvar === "cadastrarSetor"
        ? { ...this.form.value }
        : { codigoSetor: this.setor.codigoSetor, ...this.form.value };

    this.setorService[this.estadoSalvar](this.setor)
      .subscribe(
        () => this.mostrarAvisoSucesso(`Setor ${nomeAcaoRealizada} com sucesso`),
        (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "setor", ["o", "do"])}`,
          );
        },
        () => {
          setTimeout(() => {
            this.router.navigate(["dashboard/setor/listagem"]);
          }, 1700);
        },
      )
      .add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarSetor(): void {
    this.codigoSetor = +this.activateRouter.snapshot.paramMap.get("codigoSetor");

    if (this.codigoSetor !== null && this.codigoSetor !== 0) {
      this.estadoSalvar = "atualizarSetor";
      this.spinner.show("carregando");

      this.setorService
        .obterRegistro(this.codigoSetor)
        .subscribe({
          next: (setor: DadosRequisicao) => {
            this.setor = setor.data.registros as Setor;
            this.form.patchValue(this.setor);
          },
          error: (error: unknown) => {
            this.mostrarAvisoErro(error, "Houve um erro ao carregar o setor.");
          },
        })
        .add(() => this.spinner.hide("carregando"));
    }
  }
}
