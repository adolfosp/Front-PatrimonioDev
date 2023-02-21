import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import { Categoria } from "@nvs-models/Categoria";
import Componente from "@nvs-models/Componente";
import { DadosRequisicao } from "@nvs-models/DadosRequisicao";
import { Equipamento } from "@nvs-models/Equipamento";
import { Fabricante } from "@nvs-models/Fabricante";
import { CategoriaService } from "@nvs-services/categoria/categoria.service";
import { EquipamentoService } from "@nvs-services/equipamento/equipamento.service";
import { FabricanteService } from "@nvs-services/fabricante/fabricante.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-equipamento",
  templateUrl: "./equipamento.component.html",
  styleUrls: ["./equipamento.component.sass", "../../../assets/style-base.sass"],
})
export class EquipamentoComponent extends Componente implements OnInit {
  private _equipamento = {} as Equipamento;
  private _codigoEquipamento: number;
  private _limpandoCampo = false;

  public form!: FormGroup;
  public estadoSalvar = "cadastrarEquipamento";
  public fabricantes: Fabricante[] = [];
  public categorias: Categoria[] = [];
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  public select: any;
  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private fabricanteService: FabricanteService,
    private categoriaService: CategoriaService,
    private activateRouter: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarFabricantes();
    this.carregarCategorias();
    this.carregarEquipamento();
  }

  getValues() {
    this.select;
  }

  public limparCampos(): void {
    this._limpandoCampo = true;
    this.validacao();
  }

  private carregarFabricantes(): void {
    this.fabricanteService.obterTodosFabricante().subscribe({
     next: (dados: DadosRequisicao) => {
        this.fabricantes = dados.data as Fabricante[];
      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um problema ao carregar os fabricante.");
      },
    });
  }

  private carregarCategorias(): void {
    this.categoriaService.obterTodasCategorias().subscribe({
      next: (result: DadosRequisicao) => {
        this.categorias = result.data as Categoria[];
      },
      error: (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um problema ao carregar as categorias.");
      },
    });
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoTipoEquipamento: new FormControl(
        this._limpandoCampo ? this.form.get("codigoTipoEquipamento").value : 0,
        [],
      ),
      tipoEquipamento: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      codigoFabricante: new FormControl("", [Validators.required]),
      codigoCategoria: new FormControl("", [Validators.required]),
      nomeFabricante: new FormControl(""),
      nomeCategoria: new FormControl(""),
    });
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizarEquipamento";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "cadastrado";

    this.spinner.show(nomeAcaoRealizada);

    this._equipamento =
      this.estadoSalvar === "cadastrarEquipamento"
        ? { ...this.form.value }
        : { codigoTipoEquipamento: this._equipamento.codigoTipoEquipamento, ...this.form.value };

    this.equipamentoService[this.estadoSalvar](this._equipamento)
      .subscribe(
        () => this.mostrarAvisoSucesso(`Equipamento ${nomeAcaoRealizada} com sucesso`),
        (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "equipamento", [
              "o",
              "do",
            ])}`,
          );
        },
        () => {
          setTimeout(() => {
            this.router.navigate(["dashboard/equipamento/listagem"]);
          }, 1700);
        },
      )
      .add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarEquipamento(): void {
    this._codigoEquipamento = +this.activateRouter.snapshot.paramMap.get("codigoEquipamento");

    if (this._codigoEquipamento !== null && this._codigoEquipamento !== 0) {
      this.estadoSalvar = "atualizarEquipamento";
      this.spinner.show("carregando");

      this.equipamentoService
        .obterApenasUmEquipamento(this._codigoEquipamento)
        .subscribe({
          next: (dados: DadosRequisicao) => {
            this._equipamento = dados.data as Equipamento ;
            this.form.patchValue(this._equipamento);
          },
          error: (error: unknown) => {
            this.mostrarAvisoErro(error, "Houve um problema ao carregar o equipamento.");
          },
        })
        .add(() => this.spinner.hide("carregando"));
    }
  }
}
