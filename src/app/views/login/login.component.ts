import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

import { LocalStorageService } from '@nvs-services/local-storage/local-storage.service';
import { UsuarioService } from '@nvs-services/usuario/usuario.service';

import { LocalStorageChave } from '@nvs-enum/local-storage-chave.enum';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Usuario } from '@nvs-models/Usuario';

import { atribuirModoDarkLightPadrao, atribuirTemaCorretoAoRecarregarPagina } from '@nvs-helpers/ModoDarkLightHelper';
import { CriptografiaService } from '@nvs-services/criptografia/criptografia.service';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./login.component.sass', '../../../assets/style-base.sass'],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
//REFATORAR: Melhorar parte de login pelo google e facebook
  usuario = {} as Usuario;
  form!: FormGroup
  public lembrarMe: boolean;

  public ehAutenticacaoAuth: boolean;
  public usuarioAuth: SocialUser | undefined;

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      debugger;
      if(typeof user !== 'undefined' || user !== null){
        this.realizarRequisicaoObterUsuario(user.email, "1e9g63", true)
      }
    });

    this.validarCamposFormulario();
    this.atribuirValorLembrarMe();
    this.autoLogin();
    this.atribuirTipoModoVisualizacaoPadrao();
  }

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: SocialAuthService,
    private encriptar: CriptografiaService,
    private localStorageService: LocalStorageService) {
  }


  private atribuirTipoModoVisualizacaoPadrao(): void {

    if (this.localStorageService.obterChave(LocalStorageChave.DarkMode) == ''){
      atribuirModoDarkLightPadrao();
      return;
    }

    atribuirTemaCorretoAoRecarregarPagina();

  }

  public alterarLembrarMe():void {
    let decisaoUsuario = this.lembrarMe == true ? 'sim': 'nao';
    this.localStorageService.adicionarChave(LocalStorageChave.LembrarMe, decisaoUsuario);
  }

  private atribuirValorLembrarMe(): void {
    let valor: string = this.localStorageService.obterChave(LocalStorageChave.LembrarMe);
    this.lembrarMe = valor == 'sim';
  }

  private googleLogIn() {
    return from(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID))
  }

  private signInWithFB() {
    return from(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
  }

  public logarComFacebook() {

    this.signInWithFB().subscribe(
      (result: any) => {
        this.usuarioAuth = result
      },
      (error: any) => {
        if (error.error !== "popup_closed_by_user")
          this.toaster.error(`Houve um erro ao fazer login com a conta da Google. Mensagem : ${error.error}`)
      },
      () => {
        //TODO: Realizar tudo por post
        this.realizarRequisicaoObterUsuario(this.usuarioAuth.email, "1e9g63", true)
      }
    );
  }

  public validarCredenciais(): void {

    this.removerToken();
    this.spinner.show();

    let credenciais = { ...this.form.value }
    this.realizarRequisicaoObterUsuario(credenciais.email, credenciais.senha, false);

  }

  private realizarRequisicaoObterUsuario(email: string, senha: string, autenticacaoAuth: boolean): void {

    this.ehAutenticacaoAuth = autenticacaoAuth;
    this.spinner.show()

    this.usuarioService.obterUsuarioPorEmailESenha(email, senha, autenticacaoAuth).subscribe(
      (result: any) => {
        debugger;
        this.usuario = { ...result };
        this.localStorageService.adicionarChave(LocalStorageChave.Valor, this.encriptar.encrypt(result.token))

        if (Object.keys(this.usuario).length !== 0) {
          this.router.navigate(['dashboard']);
        }
      },
      (error: any) => {
        debugger;

        this.toaster.toastrConfig.timeOut = 5000;
        if (error.status == 400 && this.ehAutenticacaoAuth) {
          this.router.navigate(["register"], { queryParams: { email: this.usuarioAuth.email } })
          this.toaster.info(`Para continuar, é necessário preencher o formulário.`)

        } else {
          let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
          this.toaster[template.tipoMensagem](`Houve um erro ao fazer login. Mensagem: ${template.mensagemErro}`, template.titulo);
        }
      }
    ).add(() => this.spinner.hide())
  }

  private removerToken() {
    this.localStorageService.removerChave(LocalStorageChave.Valor)
  }

  public validarCamposFormulario(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  private autoLogin() {
    const token = this.localStorageService.obterChave(LocalStorageChave.Valor);
    const lembrarMe =  this.localStorageService.obterChave(LocalStorageChave.LembrarMe);

    if (token && lembrarMe == 'sim') {
      this.router.navigate(['dashboard']);
    }
  }

}
