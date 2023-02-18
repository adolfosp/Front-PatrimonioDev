import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SituacaoEquipamento } from '@nvs-enum/situacao-equipamento.enum';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import Componente from '@nvs-models/Componente';
import { DadosRequisicao } from '@nvs-models/DadosRequisicao';
import { Equipamento } from '@nvs-models/Equipamento';
import { Funcionario } from '@nvs-models/Funcionario';
import { InformacaoAdicional } from '@nvs-models/InformacaoAdicional';
import { Patrimonio } from '@nvs-models/Patrimonio';
import { EquipamentoService } from '@nvs-services/equipamento/equipamento.service';
import { FuncionarioService } from '@nvs-services/funcionario/funcionario.service';
import { PatrimonioService } from '@nvs-services/patrimonio/patrimonio.service';
import { TokenService } from '@nvs-services/token/token.service';
import { CLASSE_BOTAO_LIMPAR } from '@nvs-utils/classes-sass.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.sass','../../../assets/style-base.sass']
})
export class PatrimonioComponent extends Componente implements OnInit {

  public form = {} as FormGroup;
  public formAdicional = {} as FormGroup;
  public limpandoCampo = false;
  public funcionarios: Funcionario[] = [];
  public equipamentos: Equipamento[] = [];
  public patrimonio: Patrimonio = {} as Patrimonio;
  public informacaoAdicional: InformacaoAdicional = {} as InformacaoAdicional;
  public chaveSituacaoEquipamento: any
  public situacaoEquipamentoEnum = SituacaoEquipamento;
  public estadoSalvar = 'cadastrarPatrimonio'
  public valorAtualSituacaoEquipamento = "2";
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  public codigoPatrimonio: any;
  public serviceTag: any;
  public nomeFantasiaEmpresaPadrao: any;

  get f(): any {
    return this.form.controls;
  }

  get fa(): any {
    return this.formAdicional.controls;
  }

  constructor(private fb: FormBuilder,
    private fbe: FormBuilder,
    private funcionario: FuncionarioService,
    private equipamento: EquipamentoService,
    private patrimonioService: PatrimonioService,
    private toaster: ToastrService,
    private token: TokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute)
    {
      super(toaster);
      this.chaveSituacaoEquipamento = Object.keys(this.situacaoEquipamentoEnum).filter(Number);
    }

    public salvarAlteracao(): void {
      const atualizando = this.estadoSalvar == 'atualizarPatrimonio';
      const nomeAcaoRealizada = atualizando? 'atualizado': 'cadastrado';

      this.spinner.show(nomeAcaoRealizada);

      this.patrimonio = (this.estadoSalvar === 'cadastrarPatrimonio') ? {...this.form.value} : {codigoPatrimonio: this.patrimonio.codigoPatrimonio, ...this.form.value};
      this.patrimonio.situacaoEquipamento = +this.form.controls['situacaoEquipamento'].value;

      this.informacaoAdicional = (this.estadoSalvar === 'cadastrarPatrimonio') ? {...this.formAdicional.value} : {codigoInformacaoAdicional: this.informacaoAdicional.codigoInformacaoAdicional, ...this.formAdicional.value};
      this.patrimonioService[this.estadoSalvar](this.patrimonio, this.informacaoAdicional).subscribe(
        () => this.mostrarAvisoSucesso(`Patrimônio ${nomeAcaoRealizada} com sucesso`),
        (error: unknown) => {
          this.mostrarAvisoErro(error, `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"patrimônio", ['o','do'])}`);
        },
        () => {
          setTimeout(() => {
            this.router.navigate(['dashboard/patrimonio/listagem'])
          }, 1700)
        }
      ).add(() => this.spinner.hide(nomeAcaoRealizada));
    }

    public limparCampos(): void{
      this.limpandoCampo = true;
      this.validarCamposPatrimonio();
      this.validarCamposInformacaoAdicional();
    }

  ngOnInit(): void {
    this.validarCamposPatrimonio();
    this.validarCamposInformacaoAdicional();
    this.carregarPatrimonio();
    this.obterFuncionarios();
    this.obterEquipamentos();
  }

  public carregarPatrimonio() : void{
    this.activatedRoute.queryParams.subscribe(parametro => {this.codigoPatrimonio = parametro['codigoPatrimonio'], this.serviceTag = parametro['serviceTag']} );

    if(this.codigoPatrimonio !== null && this.codigoPatrimonio !== 0 && typeof this.codigoPatrimonio != 'undefined'){

      this.estadoSalvar = 'atualizarPatrimonio';
      this.spinner.show('carregando');

      this.patrimonioService.obterPatrimonioEInformacaoAdicional(this.codigoPatrimonio).subscribe(listaDeResposta =>{
        this.form.patchValue(listaDeResposta[0]);
        this.serviceTag = listaDeResposta[0].serviceTag;
        this.formAdicional.patchValue(listaDeResposta[1]);
        this.nomeFantasiaEmpresaPadrao = listaDeResposta[2];
        this.valorAtualSituacaoEquipamento = listaDeResposta[0].situacaoEquipamento.toString();

       },
       (error: unknown) => {
        this.mostrarAvisoErro(error, "Houve um erro ao tentar carregar o patrimônio.");
      }).add(() => this.spinner.hide('carregando'));
    }
  }


  private obterEquipamentos(): void {
    this.equipamento.obterTodosEquipamentos().subscribe({
      next: (dados: DadosRequisicao) =>{
        this.equipamentos = dados.data as Equipamento[];
      },
      error: (error: unknown) =>{
        this.mostrarAvisoErro(error,"Houve um problema ao carregar os equipamentos.");
      }});
  }

  private obterFuncionarios(): void{

    this.funcionario.obterTodosFuncionarios().subscribe({
      next: (dados: DadosRequisicao) =>{
        this.funcionarios = dados.data as Funcionario[];
      },
      error: (error: unknown) =>{
        this.mostrarAvisoErro(error, "Houve um problema ao carregar os funcionários.")
      }
    });
  }

  private validarCamposPatrimonio(): void {
    this.form = this.fb.group({
      codigoPatrimonio: new FormControl(this.limpandoCampo? this.form.get('codigoPatrimonio').value : 0, []),
      codigoTipoEquipamento: new FormControl('', [Validators.required]),
      tipoEquipamento: new FormControl(''),
      codigoFuncionario: new FormControl('', [Validators.required]),
      nomeFuncionario: new FormControl(''),
      codigoUsuario: new FormControl(this.token.obterCodigoUsuarioToken()),
      nomeUsuario: new FormControl(this.token.obterNomeUsuarioToken()),
      armazenamento: new FormControl(''),
      mac: new FormControl(''),
      memoriaRAM: new FormControl(''),
      modelo: new FormControl(''),
      placaDeVideo: new FormControl(''),
      processador: new FormControl(''),
      serviceTag: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      situacaoEquipamento: new FormControl()

    });
  }

  private validarCamposInformacaoAdicional(): void{
    this.formAdicional = this.fbe.group({
      codigoInformacaoAdicional: new FormControl(this.limpandoCampo? this.formAdicional.get('codigoInformacaoAdicional').value : 0, []),
      versaoWindows: new FormControl(''),
      antivirus: new FormControl(''),
      dataCompra: new FormControl(new Date(
        Date.now()
     ).toISOString()),
      dataExpiracaoGarantia: new FormControl(new Date(
        Date.now()
     ).toISOString()),
      valorPago: new FormControl('', [Validators.required]),
    });
  }

}
