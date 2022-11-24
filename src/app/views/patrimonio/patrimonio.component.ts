import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SituacaoEquipamento } from '@nvs-enum/situacao-equipamento.enum';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Equipamento } from '@nvs-models/Equipamento';
import { Funcionario } from '@nvs-models/Funcionario';
import { InformacaoAdicional } from '@nvs-models/InformacaoAdicional';
import { Patrimonio } from '@nvs-models/Patrimonio';
import { EquipamentoService } from '@nvs-services/equipamento/equipamento.service';
import { FuncionarioService } from '@nvs-services/funcionario/funcionario.service';
import { PatrimonioService } from '@nvs-services/patrimonio/patrimonio.service';
import { TokenService } from '@nvs-services/token/token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.sass','../../../assets/style-base.sass']
})
export class PatrimonioComponent implements OnInit {

  form = {} as FormGroup;
  formAdicional = {} as FormGroup;

  public funcionarios: Funcionario[] = [];
  public equipamentos: Equipamento[] = [];
  public patrimonio: Patrimonio = {} as Patrimonio;
  public informacaoAdicional: InformacaoAdicional = {} as InformacaoAdicional;
  public chaveSituacaoEquipamento: any
  public situacaoEquipamentoEnum = SituacaoEquipamento;
  private limpandoCampo: boolean = false;
  public estadoSalvar: string = 'cadastrarPatrimonio'
  public valorAtualSituacaoEquipamento = "2";

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
      this.chaveSituacaoEquipamento = Object.keys(this.situacaoEquipamentoEnum).filter(Number);
    }

    public salvarAlteracao(): void {
      let atualizando = this.estadoSalvar == 'atualizarPatrimonio';
      let nomeAcaoRealizada = atualizando? 'atualizado': 'cadastrado';

      this.spinner.show(nomeAcaoRealizada);

      this.patrimonio = (this.estadoSalvar === 'cadastrarPatrimonio') ? {...this.form.value} : {codigoPatrimonio: this.patrimonio.codigoPatrimonio, ...this.form.value};
      this.patrimonio.situacaoEquipamento = +this.form.controls['situacaoEquipamento'].value;

      this.informacaoAdicional = (this.estadoSalvar === 'cadastrarPatrimonio') ? {...this.formAdicional.value} : {codigoInformacaoAdicional: this.informacaoAdicional.codigoInformacaoAdicional, ...this.formAdicional.value};
      this.patrimonioService[this.estadoSalvar](this.patrimonio, this.informacaoAdicional).subscribe(
        () => this.toaster.success(`Patrimônio ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
        (error: any) => {
          let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
          this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"patrimônio", ['o','do'])} Mensagem: ${template.mensagemErro}`, 'Erro!');
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
       (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao tentar carregar o patrimônio. Mensagem: ${template.mensagemErro}`, template.titulo);

      }).add(() => this.spinner.hide('carregando'));
    }
  }


  private obterEquipamentos(): void {
    this.equipamento.obterTodosEquipamentos().subscribe(
      (result: Equipamento[]) =>{
        this.equipamentos = result;
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar os equipamentos. Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () =>{}

    );
  }

  private obterFuncionarios(): void{

    this.funcionario.obterTodosFuncionarios().subscribe(
      (result: Funcionario[]) =>{
        this.funcionarios = result;
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar os funcionários. Mensagem: ${template.mensagemErro}`, 'Erro!');
      }
    );
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