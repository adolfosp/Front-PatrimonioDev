import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import { Categoria } from "@nvs-models/Categoria";
import Componente from "@nvs-models/Componente";
import { Equipamento } from "@nvs-models/Equipamento";
import { Fabricante } from "@nvs-models/Fabricante";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { SelectService } from "@nvs-services/componente/select.service";
import { EquipamentoService } from "@nvs-services/equipamento/equipamento.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-equipamento",
  templateUrl: "./equipamento.component.html",
  styleUrls: ["./equipamento.component.sass", "../../../assets/style-base.sass"],
})
export class EquipamentoComponent extends Componente implements OnInit {
  private _paginacaoSelectGenerico: Pagination;

  private _equipamento = {} as Equipamento;
  private _codigoEquipamento: number;
  private _limpandoCampo = false;

  public form!: FormGroup;
  public estadoSalvar = "cadastrar";
  public fabricantes: Fabricante[] = [];
  public categorias: Categoria[] = [];
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;
  public paginacaoSelectCategoria: Pagination;
  public paginacaoSelectFabricante: Pagination;

  public select: any;
  get f(): any {
    return this.form.controls;
  }

  get controlCategoria() {
    return this.form.controls["codigoCategoria"] as FormControl;
  }

  get controlFabricante() {
    return this.form.controls["codigoFabricante"] as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private activateRouter: ActivatedRoute,
    private selectService: SelectService,
    private title: Title
  ) {
    super();
    title.setTitle("Equipamento")

    this._paginacaoSelectGenerico = configuracaoPaginacao;
    this.paginacaoSelectCategoria = configuracaoPaginacao;
    this.paginacaoSelectFabricante = configuracaoPaginacao;
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarEquipamento();
  }

  onSelectAberto(event: any, select: string, nomeMetodo: string) {
    if (!event) return;

    this[select].panel.nativeElement.addEventListener("scroll", () => {
      if (!this.selectService.deveObterMaisRegistros(event, this[select])) return;

      const paginacao = this.selectService.ObterPaginacao(this._paginacaoSelectGenerico);
      this[nomeMetodo](paginacao);
    });
  }

  getValues() {
    this.select;
  }

  public limparCampos(): void {
    this._limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoTipoEquipamento: new FormControl<number>(
        this._limpandoCampo ? this.form.get("codigoTipoEquipamento").value : 0,
        [],
      ),
      tipoEquipamento: new FormControl<string>("", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      codigoFabricante: new FormControl<number>(0, [Validators.required]),
      codigoCategoria: new FormControl<number>(0, [Validators.required]),
      nomeFabricante: new FormControl<string>(""),
      nomeCategoria: new FormControl<string>(""),
    });
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizar";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "cadastrado";

    this.spinner.show(nomeAcaoRealizada);

    this._equipamento =
      this.estadoSalvar === "cadastrar"
        ? { ...this.form.value }
        : {
            codigoTipoEquipamento: this._equipamento.codigoTipoEquipamento,
            ...this.form.value,
          };

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
      this.estadoSalvar = "atualizar";
      this.spinner.show("carregando");

      this.equipamentoService
        .obterRegistro(this._codigoEquipamento)
        .subscribe({
          next: (dados: DadosRequisicao) => {
            this._equipamento = dados.data as Equipamento;
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
