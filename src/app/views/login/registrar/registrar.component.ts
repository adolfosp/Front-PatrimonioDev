import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { DarkModeImagemHelper } from '@nvs-helpers/DarkModeImagemHelper';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { atribuirTemaCorretoAoRecarregarPagina } from '@nvs-helpers/ModoDarkLightHelper';
import { ValidacaoCampoSenha } from '@nvs-helpers/ValidacaoSenhaHelper';
import { Usuario } from '@nvs-models/Usuario';
import { UsuarioService } from '@nvs-services/usuario/usuario.service';

@Component({
  selector: 'app-registrar',
  styleUrls: ['../../../../assets/style-base.sass', './registrar.component.sass'],
  templateUrl: 'registrar.component.html'
})
export class RegistrarComponent implements OnInit {

  form!: FormGroup;
  usuario = {} as Usuario;
  emailAuth?: any;

  public get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService,
    private toaster: ToastrService,
    private router: Router) {
    var emailURL = this.router.getCurrentNavigation().extras;
    this.emailAuth = typeof emailURL.queryParams == 'undefined' ? '' : emailURL.queryParams['email'];

  }

  ngOnInit(): void {
    this.validarCamposFormulario();

    this.alternarImagemDarkMode();
  }

  private alternarImagemDarkMode(): void {

    let darkModeImagem = new DarkModeImagemHelper('assets/img/novo-registro-dark.gif',
                                                  'assets/img/novo-registro.gif',
                                                  'imagem-novo-registro');

    darkModeImagem.alternarImagemDeAcordoComOModo();

    atribuirTemaCorretoAoRecarregarPagina();

  }

  public validarCamposFormulario(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidacaoCampoSenha.MustMatch('senha', 'confirmeSenha')
    };

    this.form = this.fb.group({
      codigoUsuario: new FormControl(''),
      codigoUsuarioPermissao: new FormControl(3),
      codigoEmpresa: new FormControl(1),
      codigoSetor: new FormControl(1),
      codigoPerfil: new FormControl(3),
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      email: new FormControl(this.emailAuth, [Validators.required, Validators.minLength(10), Validators.email]),
      confirmeSenha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      ativo: new FormControl(true, [])
    }, formOptions);
  }

  public salvarAlteracao(): void {

    this.usuario = { ...this.form.value };
    this.spinner.show();

    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      () => this.toaster.success('Usuário cadastrado com sucesso. Redirecionando para a tela de login', 'Sucesso!'),
      (error: any) => {
        this.toaster.toastrConfig.timeOut = 2000;
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro durante o cadastro do usuário. Mensagem ${template.mensagemErro}`, 'Erro');
      },
      () => {
        setTimeout(() => {
          this.router.navigate(['login'])
        }, 2000)
      }
    ).add(() => this.spinner.hide());
  }
}
