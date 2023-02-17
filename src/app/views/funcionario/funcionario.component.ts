import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { DadosRequisicao } from '@nvs-models/DadosRequisicao';
import { Funcionario } from '@nvs-models/Funcionario';
import { Setor } from '@nvs-models/Setor';
import { FuncionarioService } from '@nvs-services/funcionario/funcionario.service';
import { SetorService } from '@nvs-services/setor/setor.service';
import { CLASSE_BOTAO_LIMPAR } from '@nvs-utils/classes-sass.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.sass', '../../../assets/style-base.sass']
})
export class FuncionarioComponent implements OnInit {

  private _funcionario = {} as Funcionario;
  private _codigoFuncionario: number;
  private _limpandoCampo = false;

  public estadoSalvar = 'cadastrarFuncionario';
  public setores: Setor[];
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;
  public form!: FormGroup;


  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private setorService: SetorService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarFuncionario();
    this.carregarSetor();
    this.controlarVisibilidadeCampoAtivo();
  }

  public limparCampos(): void {
    this._limpandoCampo = true;
    this.validacao();
  }

  private carregarSetor(): void {
    this.setorService.obterSetor().subscribe({
      next: (dados: DadosRequisicao) => {
        this.setores = dados.data as Setor[];
      },
      error: (error: unknown) => {
        this.toaster.error(`Houve um erro ao carregar o setor. Mensagem ${error["message"]}`, 'Erro!');
      },
    });
  }

  private controlarVisibilidadeCampoAtivo(): void {

    if (this.estadoSalvar == 'cadastrarFuncionario')
      this.form.controls['ativo'].disable()
    else
      this.form.controls['ativo'].enable()
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoFuncionario: new FormControl(this._limpandoCampo ? this.form.get('codigoFuncionario').value : 0, []),
      nomeFuncionario: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      ativo: new FormControl(true),
      codigoSetor: new FormControl('' ,[Validators.required]),
      observacao: new FormControl(''),

    });
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == 'atualizarFuncionario';
    const nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this._funcionario = (this.estadoSalvar === 'cadastrarFuncionario') ? { ...this.form.value } : { codigoFuncionario: this._funcionario.codigoFuncionario, ...this.form.value };

    this.funcionarioService[this.estadoSalvar](this._funcionario).subscribe(
      () => this.toaster.success(`Funcionário ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: unknown) => {
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "funcionário", ['o', 'do'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () => {
        setTimeout(() => {
          this.router.navigate(['dashboard/funcionario/listagem'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  public carregarFuncionario(): void {

    this._codigoFuncionario = +this.activateRouter.snapshot.paramMap.get('codigoFuncionario');

    if (this._codigoFuncionario !== null && this._codigoFuncionario !== 0) {
      this.estadoSalvar = 'atualizarFuncionario';
      this.spinner.show('carregando');

      this.funcionarioService.obterApenasUmFuncionario(this._codigoFuncionario).subscribe(
        {
          next: (funcionario: Funcionario) => {
            this._funcionario = { ...funcionario };
            this.form.patchValue(this._funcionario);
          },
          error: (error: unknown) => {
            const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao tentar carregar o funcionário. Mensagem: ${template.mensagemErro}`, template.titulo);
          }
        }
      ).add(() => this.spinner.hide('carregando'));
    }
  }

}
