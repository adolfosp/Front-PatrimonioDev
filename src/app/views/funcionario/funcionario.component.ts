import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Funcionario } from '@nvs-models/Funcionario';
import { Setor } from '@nvs-models/Setor';
import { FuncionarioService } from '@nvs-services/funcionario/funcionario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SetorService } from '../../services/setor/setor.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.sass', '../../../assets/style-base.sass']
})
export class FuncionarioComponent implements OnInit {

  form!: FormGroup;
  funcionario = {} as Funcionario;
  codigoFuncionario: number;
  public estadoSalvar: string = 'cadastrarFuncionario';
  private limpandoCampo: boolean = false;
  setores: Setor[];

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
    this.limpandoCampo = true;
    this.validacao();
  }

  private carregarSetor(): void {
    this.setorService.obterSetor().subscribe({
      next: (setores: Setor[]) => {
        this.setores = setores
      },
      error: (error: any) => {
        this.toaster.error(`Houve um erro ao carregar o setor. Mensagem ${error.message}`, 'Erro!');
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
      codigoFuncionario: new FormControl(this.limpandoCampo ? this.form.get('codigoFuncionario').value : 0, []),
      nomeFuncionario: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      ativo: new FormControl(true),
      codigoSetor: new FormControl('' ,[Validators.required]),
      observacao: new FormControl(''),

    });
  }

  public salvarAlteracao(): void {
    let atualizando = this.estadoSalvar == 'atualizarFuncionario';
    let nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this.funcionario = (this.estadoSalvar === 'cadastrarFuncionario') ? { ...this.form.value } : { codigoFuncionario: this.funcionario.codigoFuncionario, ...this.form.value };

    this.funcionarioService[this.estadoSalvar](this.funcionario).subscribe(
      () => this.toaster.success(`Funcionário ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        debugger;
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
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

    this.codigoFuncionario = +this.activateRouter.snapshot.paramMap.get('codigoFuncionario');

    if (this.codigoFuncionario !== null && this.codigoFuncionario !== 0) {
      this.estadoSalvar = 'atualizarFuncionario';
      this.spinner.show('carregando');

      this.funcionarioService.obterApenasUmFuncionario(this.codigoFuncionario).subscribe(
        {
          next: (funcionario: Funcionario) => {
            this.funcionario = { ...funcionario };
            this.form.patchValue(this.funcionario);
          },
          error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao tentar carregar o funcionário. Mensagem: ${template.mensagemErro}`, template.titulo);
          }
        }
      ).add(() => this.spinner.hide('carregando'));
    }
  }

}