import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Empresa } from '@nvs-models/Empresa';
import { EmpresaService } from '@nvs-services/empresa/empresa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.sass', '../../../assets/style-base.sass']
})
export class EmpresaComponent implements OnInit {

  form!: FormGroup;
  private empresa = {} as Empresa;
  public estadoSalvar = 'cadastrarEmpresa';
  private codigoEmpresa: number;
  private limpandoCampo: boolean = false;

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private empresaService: EmpresaService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarEmpresa();
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoEmpresa: new FormControl(this.limpandoCampo? this.form.get('codigoEmpresa').value : 0, []),
      nomeFantasia: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]),
      cnpj: new FormControl('', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]),
      razaoSocial: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]),
      empresaPadraoImpressao: new FormControl(false)
    });
  }

  public salvarAlteracao(): void {

    let atualizando = this.estadoSalvar == 'atualizarEmpresa';
    let nomeAcaoRealizada = atualizando? 'atualizada': 'cadastrada';

    this.spinner.show(nomeAcaoRealizada);

    this.empresa = (this.estadoSalvar === 'cadastrarEmpresa') ? {...this.form.value} : {codigoEmpresa: this.empresa.codigoEmpresa, ...this.form.value};
    debugger;
    this.empresaService[this.estadoSalvar](this.empresa).subscribe(
      () => this.toaster.success(`Empresa ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        debugger;
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"empresa", ['o','da'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/empresa/listagem'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarEmpresa() : void{
    this.codigoEmpresa = +this.activateRouter.snapshot.paramMap.get('codigoEmpresa');
     if(this.codigoEmpresa !== null && this.codigoEmpresa !== 0){

      this.estadoSalvar = 'atualizarEmpresa';
       this.spinner.show('carregando');

       this.empresaService.obterApenasUmaEmpresa(this.codigoEmpresa).subscribe(
         {
           next: (empresa: Empresa) => {
             this.empresa = {...empresa};
             this.form.patchValue(this.empresa);
             debugger;

           },
           error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um problema ao carregar a empresa. Mensagem: ${template.mensagemErro}`, template.titulo);
           }
         }
       ).add(() => this.spinner.hide('carregando'));
     }
   }

}
