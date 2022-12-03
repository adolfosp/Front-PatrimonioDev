import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Setor } from '@nvs-models/Setor';
import { SetorService } from '@nvs-services/setor/setor.service';
import { CLASSE_BOTAO_LIMPAR } from 'src/app/utils/classes-sass.constant';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.sass','../../../assets/style-base.sass']
})
export class SetorComponent implements OnInit {

  private limpandoCampo = false;
  private codigoSetor: number;

  public form!: FormGroup;
  public setor = {} as Setor;
  public estadoSalvar = 'cadastrarSetor';
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private activateRouter: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.validacao();
    this.carregarSetor();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoSetor: new FormControl(this.limpandoCampo? this.form.get('codigoSetor').value : 0, []),
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  public salvarAlteracao(): void {

    const atualizando = this.estadoSalvar == 'atualizarSetor';
    const nomeAcaoRealizada = atualizando? 'atualizado': 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this.setor = (this.estadoSalvar === 'cadastrarSetor') ? {...this.form.value} : {codigoSetor: this.setor.codigoSetor, ...this.form.value};

    this.setorService[this.estadoSalvar](this.setor).subscribe(
      () => this.toaster.success(`Setor ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: unknown) => {
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"setor", ['o','do'])} Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/setor/listagem'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarSetor() : void{
    this.codigoSetor = +this.activateRouter.snapshot.paramMap.get('codigoSetor');

     if(this.codigoSetor !== null && this.codigoSetor !== 0){
      this.estadoSalvar = 'atualizarSetor';
       this.spinner.show('carregando');

       this.setorService.obterApenasUmSetor(this.codigoSetor).subscribe(
         {
           next: (setor: Setor) => {
             this.setor = {...setor};
             this.form.patchValue(this.setor);
           },
           error: (error: unknown) => {
            const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao carregar o setor. Mensagem: ${template.mensagemErro}`, template.titulo);
           }
         }
       ).add(() => this.spinner.hide('carregando'));
     }
   }
}
