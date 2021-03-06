import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/Funcionario';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicaoHelper';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss','../../../scss/style-base.scss']
})
export class FuncionarioComponent implements OnInit {

  form!: FormGroupTypeSafe<Funcionario>;
  funcionario = {} as Funcionario;
  codigoFuncionario: number;
  public estadoSalvar: string = 'cadastrarFuncionario';
  private limpandoCampo: boolean = false;

  get f(): any {
    return this.form.controls;
  }

  constructor(
              private fb: FormBuilderTypeSafe,
              private funcionarioService: FuncionarioService,
              private toaster: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private activateRouter: ActivatedRoute) {

               }

  ngOnInit(): void {
    this.validacao();
    this.carregarFuncionario();
    this.controlarVisibilidadeCampoAtivo();
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private controlarVisibilidadeCampoAtivo(): void{

    if(this.estadoSalvar == 'cadastrarFuncionario')
       this.form.controls.ativo.disable()
    else
      this.form.controls.ativo.enable()
  }

  private validacao(): void {
    this.form = this.fb.group<Funcionario>({
      codigoFuncionario: new FormControl(this.limpandoCampo? this.form.get('codigoFuncionario').value : 0, []),
      nomeFuncionario: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      ativo: new FormControl(true),
      observacao: new FormControl(''),

    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {
    let atualizando = this.estadoSalvar == 'atualizarFuncionario';
    let nomeAcaoRealizada = atualizando? 'atualizado': 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this.funcionario = (this.estadoSalvar === 'cadastrarFuncionario') ? {...this.form.value} : {codigoFuncionario: this.funcionario.codigoFuncionario, ...this.form.value};

    this.funcionarioService[this.estadoSalvar](this.funcionario).subscribe(
      () => this.toaster.success(`Funcion??rio ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        debugger;
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"funcion??rio", ['o','do'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () => {
        setTimeout(() => {
          this.router.navigate(['dashboard/listar-funcionario'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  public carregarFuncionario() : void{

    this.codigoFuncionario = +this.activateRouter.snapshot.paramMap.get('codigoFuncionario');

     if(this.codigoFuncionario !== null && this.codigoFuncionario !== 0){
      this.estadoSalvar = 'atualizarFuncionario';
       this.spinner.show('carregando');

       this.funcionarioService.obterApenasUmFuncionario(this.codigoFuncionario).subscribe(
         {
           next: (funcionario: Funcionario) => {
             this.funcionario = {...funcionario};
             this.form.patchValue(this.funcionario);
           },
           error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao tentar carregar o funcion??rio. Mensagem: ${template.mensagemErro}`, template.titulo);
           }
         }
       ).add(() => this.spinner.hide('carregando'));
     }
    }

}
