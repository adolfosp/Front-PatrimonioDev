import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { ValidacaoCampoSenha } from '@nvs-helpers/ValidacaoSenhaHelper';
import { Empresa } from '@nvs-models/Empresa';
import { Setor } from '@nvs-models/Setor';
import { Usuario } from '@nvs-models/Usuario';
import { UsuarioPermissao } from '@nvs-models/UsuarioPermissao';
import { EmpresaService } from '@nvs-services/empresa/empresa.service';
import { PermissaoService } from '@nvs-services/permissao/permissao.service';
import { SetorService } from '@nvs-services/setor/setor.service';
import { UsuarioService } from '@nvs-services/usuario/usuario.service';
import { CLASSE_BOTAO_LIMPAR } from '@nvs-utils/classes-sass.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass', '../../../assets/style-base.sass']
})
export class UsuarioComponent implements OnInit {

  private codigoUsuario: number;
  private usuario = {} as Usuario;

  public form!: FormGroup;
  public estadoSalvar = 'cadastrarUsuario';
  public setores: Setor[] = [];
  public empresas: Empresa[] = [];
  public permissoes: UsuarioPermissao[] = [];
  public limpandoCampo = false;
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private setorService: SetorService,
    private empresaService: EmpresaService,
    private permissaoService: PermissaoService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
      this.validacao();
      this.carregarUsuario();
      this.carregarSetor();
      this.carregarEmpresa();
      this.carregarPermissao();
      this.controlarVisibilidadeCampoAtivo();

  }
  private controlarVisibilidadeCampoAtivo(): void{

    if(this.estadoSalvar == 'cadastrarUsuario')
       this.form.controls['ativo'].disable()
    else
      this.form.controls['ativo'].enable()
  }

  private carregarSetor(): void {
    this.setorService.obterSetor().subscribe(
      (setores: Setor[]) => {
        this.setores = setores
      },
      (error: any) => {
        this.toaster.error(`Houve um erro ao carregar o setor. Mensagem ${error.message}`, 'Erro!');
      },
    );
  }

  private carregarEmpresa(): void {
    this.empresaService.obterEmpresas().subscribe(
      (empresas: Empresa[]) => {
        this.empresas = empresas
      },
      (error: any) => {
        this.toaster.error(`Houve um erro ao carregar a empresa. Mensagem ${error.message}`, 'Erro!');
      },
    );
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private carregarPermissao(): void {
    this.permissaoService.obterPermissoes().subscribe(
      (permissoes: UsuarioPermissao[]) => {
        this.permissoes = permissoes
      },
      (error: any) => {
        this.toaster.error(`Houve um erro ao carregar a permissão. Mensagem ${error.message}`, 'Erro!');
      },
    );
  }

  private validacao(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidacaoCampoSenha.MustMatch('senha','confirmeSenha')
    };

    this.form = this.fb.group({
      codigoUsuario: new FormControl(this.limpandoCampo? this.form.get('codigoUsuario').value : 0, []),
      codigoPerfil: new FormControl('', [Validators.required]),
      codigoEmpresa: new FormControl('' ,[Validators.required]),
      codigoSetor: new FormControl('' ,[Validators.required]),
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
      confirmeSenha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      ativo: new FormControl(true)
    }, formOptions);
  }

  public salvarAlteracao(): void {

    let atualizando = this.estadoSalvar == 'atualizarUsuario';
    let nomeAcaoRealizada = atualizando? 'atualizado': 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this.usuario = (this.estadoSalvar === 'cadastrarUsuario') ? {...this.form.value} : {codigoUsuario: this.usuario.codigoUsuario, ...this.form.value};
    debugger;
    this.usuarioService[this.estadoSalvar](this.usuario).subscribe(
      () => this.toaster.success(`Usuário ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"usuário", ['o','do'])} Mensagem: ${template.mensagemErro}`, 'Erro!');      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/usuario/listagem'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  public carregarUsuario() : void{
    this.codigoUsuario = +this.activateRouter.snapshot.paramMap.get('codigoUsuario');
     if(this.codigoUsuario !== null && this.codigoUsuario !== 0){
      this.estadoSalvar = 'atualizarUsuario';
       this.spinner.show('carregando');

       this.usuarioService.obterApenasUmUsuario(this.codigoUsuario).subscribe(
         {
           next: (usuario: Usuario) => {
             this.usuario = {...usuario};
             this.form.patchValue(this.usuario);
             this.form.controls['confirmeSenha'].setValue(usuario.senha);
           },
           error: (error: any) => {
             this.toaster.error(`Houve um erro ao tentar carregar o usuário. Mensagem: ${error.message}`, 'Erro!');
           }
         }
       ).add(() => this.spinner.hide('carregando'));
     }
   }
}
