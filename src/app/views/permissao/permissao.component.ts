import { PermissaoService } from './../../services/permissao/permissao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioPermissao } from '../../models/UsuarioPermissao';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicaoHelper';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.scss', '../../../scss/style-base.scss']
})
export class PermissaoComponent implements OnInit {

  form!: FormGroupTypeSafe<UsuarioPermissao>;;
  permissao = {} as UsuarioPermissao;
  codigoUsuarioPermissao: number;
  estadoSalvar: string = 'cadastrarPermissao';
  private limpandoCampo: boolean = false;

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilderTypeSafe,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private permissaoService: PermissaoService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarPermissao();
    this.controlarVisibilidadeCampoAtivo();
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private controlarVisibilidadeCampoAtivo(): void{

    if(this.estadoSalvar == 'cadastrarPermissao')
       this.form.controls.ativo.disable()
    else
      this.form.controls.ativo.enable()
  }

  public carregarPermissao() : void{
    this.codigoUsuarioPermissao = +this.activateRouter.snapshot.paramMap.get('codigoPermissao');

     if(this.codigoUsuarioPermissao !== null && this.codigoUsuarioPermissao !== 0){
      this.estadoSalvar = 'atualizarPermissao';
       this.spinner.show('carregando');

       this.permissaoService.obterApenasUmaPermissao(this.codigoUsuarioPermissao).subscribe(
         {
           next: (permissao: UsuarioPermissao) => {
             this.permissao = {...permissao};
             this.form.patchValue(this.permissao);
           },
           error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao carregar a permiss??o. Mensagem ${template.mensagemErro}`, template.titulo);           }
         }
       ).add(() => this.spinner.hide('carregando'));
     }
   }

  private validacao(): void {
    this.form = this.fb.group<UsuarioPermissao>({
      codigoUsuarioPermissao: new FormControl(this.limpandoCampo? this.form.get('codigoUsuarioPermissao').value : 0, []),
      descricaoPermissao: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      ativo: new FormControl(true),
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {

    let atualizando = this.estadoSalvar == 'atualizarPatrimonio';
    let nomeAcaoRealizada = atualizando? 'atualizada': 'cadastrada';

    this.spinner.show(nomeAcaoRealizada);

    this.permissao = (this.estadoSalvar === 'cadastrarPermissao') ? {...this.form.value} : {codigoUsuarioPermissao: this.permissao.codigoUsuarioPermissao, ...this.form.value};

    this.permissaoService[this.estadoSalvar](this.permissao).subscribe(
      () => this.toaster.success(`Permiss??o ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"permiss??o", ['o','da'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/listar-permissao'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }
}
