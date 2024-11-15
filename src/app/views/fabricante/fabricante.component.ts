import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import Componente from "@nvs-models/Componente";
import { Fabricante } from "@nvs-models/Fabricante";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { FabricanteService } from "@nvs-services/fabricante/fabricante.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-fabricante",
  templateUrl: "./fabricante.component.html",
  styleUrls: ["./fabricante.component.sass", "../../../assets/style-base.sass"],
})
export class FabricanteComponent extends Componente implements OnInit {
  private _limpandoCampo = false;
  private _fabricante = {} as Fabricante;
  private _codigoFabricante: number;

  public form!: FormGroup;
  public estadoSalvar = "cadastrar";
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private fabricanteService: FabricanteService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private title: Title
  ) {
    super();
    this.title.setTitle("Fabricante");
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarFabricante();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoFabricante: new FormControl<number>(this._limpandoCampo ? this.form.get("codigoFabricante").value : 0, []),
      nomeFabricante: new FormControl<string>("", [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    });
  }

  public limparCampos(): void {
    this._limpandoCampo = true;
    this.validacao();
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizar";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "cadastrado";

    this.spinner.show(nomeAcaoRealizada);

    this._fabricante =
      this.estadoSalvar === "cadastrar"
        ? { ...this.form.value }
        : { codigoFabricante: this._fabricante.codigoFabricante, ...this.form.value };

    this.fabricanteService[this.estadoSalvar](this._fabricante)
      .subscribe(
        () => this.mostrarAvisoSucesso(`Fabricante ${nomeAcaoRealizada} com sucesso`),
        (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "fabricante", [
              "o",
              "do",
            ])}`,
          );
        },
        () => {
          setTimeout(() => {
            this.router.navigate(["dashboard/fabricante/listagem"]);
          }, 1700);
        },
      )
      .add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  public carregarFabricante(): void {
    this._codigoFabricante = +this.activateRouter.snapshot.paramMap.get("codigoFabricante");
    if (this._codigoFabricante !== null && this._codigoFabricante !== 0) {
      this.estadoSalvar = "atualizar";
      this.spinner.show("carregando");

      this.fabricanteService
        .obterRegistro(this._codigoFabricante)
        .subscribe({
          next: (dados: DadosRequisicao) => {
            this._fabricante = { ...(dados.data as Fabricante) };
            this.form.patchValue(this._fabricante);
          },
          error: (error: unknown) => {
            this.mostrarAvisoErro(error, "Houve um erro ao tentar carregar o fabricante.");
          },
        })
        .add(() => this.spinner.hide("carregando"));
    }
  }
}
