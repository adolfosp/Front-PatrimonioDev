import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import Componente from "@nvs-models/Componente";
import { Equipamento } from "@nvs-models/Equipamento";
import { Funcionario } from "@nvs-models/Funcionario";
import { InformacaoAdicional } from "@nvs-models/InformacaoAdicional";
import { Patrimonio } from "@nvs-models/Patrimonio";
import InserirPatrimonioDto from "@nvs-models/dtos/InserirPatrimonioDto";
import { SituacaoEquipamento } from "@nvs-models/enums/situacao-equipamento.enum";
import { PatrimonioService } from "@nvs-services/patrimonio/patrimonio.service";
import { TokenService } from "@nvs-services/token/token.service";
import { CLASSE_BOTAO_LIMPAR } from "@nvs-utils/classes-sass.constant";
import { configuracaoPaginacao } from "@nvs-utils/configuracao-paginacao";
import { ConfiguracaoSpinner } from "@nvs-utils/configuracao-spinner";
import { Pagination } from "ngx-easy-table";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-patrimonio",
  templateUrl: "./patrimonio.component.html",
  styleUrls: ["./patrimonio.component.sass", "../../../assets/style-base.sass"],
})
export class PatrimonioComponent extends Componente implements OnInit {
  public form = {} as FormGroup;
  public formAdicional = {} as FormGroup;
  public limpandoCampo = false;
  public funcionarios: Funcionario[] = [];
  public equipamentos: Equipamento[] = [];
  public patrimonio: Patrimonio = {} as Patrimonio;
  public informacaoAdicional = {} as InformacaoAdicional;
  public chaveSituacaoEquipamento: any;
  public situacaoEquipamentoEnum = SituacaoEquipamento;
  public estadoSalvar = "cadastrar";
  public valorAtualSituacaoEquipamento = "2";
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;
  public confSpinner = ConfiguracaoSpinner;

  public codigoPatrimonio: any;
  public serviceTag: any;
  public nomeFantasiaEmpresaPadrao: any;
  public paginacaoSelectFuncionario: Pagination;
  public paginacaoSelectEquipamento: Pagination;

  get f(): any {
    return this.form.controls;
  }

  get fa(): any {
    return this.formAdicional.controls;
  }

  get controlFuncionario() {
    return this.form.controls["codigoFuncionario"] as FormControl;
  }

  get controlEquipamento() {
    return this.form.controls["codigoTipoEquipamento"] as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private fbe: FormBuilder,
    private patrimonioService: PatrimonioService,
    private token: TokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {
    super();
    this.title.setTitle("Patrimônio");
    this.paginacaoSelectFuncionario = configuracaoPaginacao;
    this.paginacaoSelectEquipamento = configuracaoPaginacao;

    this.chaveSituacaoEquipamento = Object.keys(this.situacaoEquipamentoEnum).filter(Number);
  }

  ngOnInit(): void {
    this.validarCamposPatrimonio();
    this.validarCamposInformacaoAdicional();
    this.carregarPatrimonio();
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == "atualizar";
    const nomeAcaoRealizada = atualizando ? "atualizado" : "cadastrado";

    this.spinner.show(nomeAcaoRealizada);

    this.patrimonio = this.obterPatrimonio();
    this.patrimonio.situacaoEquipamento = +this.form.controls["situacaoEquipamento"].value;

    this.informacaoAdicional = this.obterInformacaoAdicional();

    const inserirPatrimonioDto = new InserirPatrimonioDto(this.patrimonio, this.informacaoAdicional);

    this.patrimonioService[this.estadoSalvar](inserirPatrimonioDto)
      .subscribe(
        () => this.mostrarAvisoSucesso(`Patrimônio ${nomeAcaoRealizada} com sucesso`),
        (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "patrimônio", [
              "o",
              "do",
            ])}`,
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

  private obterPatrimonio(): any {
    return this.estadoSalvar === "cadastrar"
      ? { ...this.form.value }
      : {
          codigoPatrimonio: this.patrimonio.codigoPatrimonio,
          ...this.form.value,
        };
  }

  private obterInformacaoAdicional(): any {
    return this.estadoSalvar === "cadastrar"
      ? { ...this.formAdicional.value }
      : {
          codigoInformacaoAdicional: this.informacaoAdicional.codigoInformacaoAdicional,
          ...this.formAdicional.value,
        };
  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validarCamposPatrimonio();
    this.validarCamposInformacaoAdicional();
  }

  public carregarPatrimonio(): void {
    this.activatedRoute.queryParams.subscribe((parametro) => {
      (this.codigoPatrimonio = parametro["codigoPatrimonio"]), (this.serviceTag = parametro["serviceTag"]);
    });

    if (this.codigoPatrimonio !== null && this.codigoPatrimonio !== 0 && typeof this.codigoPatrimonio != "undefined") {
      this.estadoSalvar = "atualizar";
      this.spinner.show("carregando");

      this.patrimonioService
        .obterPatrimonioEInformacaoAdicional(this.codigoPatrimonio)
        .subscribe({
          next: (listaDeResposta) => {
            this.form.patchValue(listaDeResposta[0].data);
            this.serviceTag = listaDeResposta[0].data.serviceTag;
            this.formAdicional.patchValue(listaDeResposta[1].data);

            this.nomeFantasiaEmpresaPadrao = listaDeResposta[2].data;
            this.valorAtualSituacaoEquipamento = listaDeResposta[0].data.situacaoEquipamento.toString();
          },
          error: (error: unknown) => {
            this.mostrarAvisoErro(error, "Houve um erro ao tentar carregar o patrimônio.");
          },
        })
        .add(() => this.spinner.hide("carregando"));
    }
  }

  private validarCamposPatrimonio(): void {
    this.form = this.fb.group({
      codigoPatrimonio: new FormControl(this.limpandoCampo ? this.form.get("codigoPatrimonio").value : 0, []),
      codigoTipoEquipamento: new FormControl("", [Validators.required]),
      tipoEquipamento: new FormControl(""),
      codigoFuncionario: new FormControl("", [Validators.required]),
      nomeFuncionario: new FormControl(""),
      codigoUsuario: new FormControl(this.token.obterCodigoUsuarioToken()),
      nomeUsuario: new FormControl(this.token.obterNomeUsuarioToken()),
      armazenamento: new FormControl(""),
      mac: new FormControl(""),
      memoriaRAM: new FormControl(""),
      modelo: new FormControl(""),
      placaDeVideo: new FormControl(""),
      processador: new FormControl(""),
      serviceTag: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      situacaoEquipamento: new FormControl(),
    });
  }

  private validarCamposInformacaoAdicional(): void {
    this.formAdicional = this.fbe.group({
      codigoInformacaoAdicional: new FormControl(
        this.limpandoCampo ? this.formAdicional.get("codigoInformacaoAdicional").value : 0,
        [],
      ),
      versaoWindows: new FormControl(""),
      antivirus: new FormControl(""),
      dataCompra: new FormControl(new Date(Date.now()).toISOString()),
      dataExpiracaoGarantia: new FormControl(new Date(Date.now()).toISOString()),
      valorPago: new FormControl("", [Validators.required]),
    });
  }
}
