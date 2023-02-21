import {
  SocialUser
} from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

import { LocalStorageService } from "@nvs-services/local-storage/local-storage.service";
import { UsuarioService } from "@nvs-services/usuario/usuario.service";

import { LocalStorageChave } from "@nvs-enum/local-storage-chave.enum";

import { atribuirModoDarkLightPadrao, atribuirTemaCorretoAoRecarregarPagina } from "@nvs-helpers/ModoDarkLightHelper";
import Componente from "@nvs-models/Componente";
import { CriptografiaService } from "@nvs-services/criptografia/criptografia.service";

@Component({
  selector: "app-dashboard",
  styleUrls: ["./login.component.sass", "../../../assets/style-base.sass"],
  templateUrl: "login.component.html",
})
export class LoginComponent extends Componente implements OnInit {
  form!: FormGroup;
  public lembrarMe: boolean;

  public ehAutenticacaoAuth: boolean;
  public usuarioAuth: SocialUser | undefined;

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validarCamposFormulario();
    this.atribuirValorLembrarMe();
    this.autoLogin();
    this.atribuirTipoModoVisualizacaoPadrao();
  }

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private encriptar: CriptografiaService,
    private localStorageService: LocalStorageService,
  ) {
    super();
  }

  private atribuirTipoModoVisualizacaoPadrao(): void {
    if (this.localStorageService.obterChave(LocalStorageChave.DarkMode) == "") {
      atribuirModoDarkLightPadrao();
      return;
    }

    atribuirTemaCorretoAoRecarregarPagina();
  }

  public alterarLembrarMe(): void {
    const decisaoUsuario = this.lembrarMe == true ? "sim" : "nao";
    this.localStorageService.adicionarChave(LocalStorageChave.LembrarMe, decisaoUsuario);
  }

  private atribuirValorLembrarMe(): void {
    const valor: string = this.localStorageService.obterChave(LocalStorageChave.LembrarMe);
    this.lembrarMe = valor == "sim";
  }

  public validarCredenciais(): void {
    this.removerToken();
    this.spinner.show();

    const credenciais = { ...this.form.value };
    this.realizarRequisicaoObterUsuario(credenciais.email, credenciais.senha, false);
  }

  private realizarRequisicaoObterUsuario(email: string, senha: string, autenticacaoAuth: boolean): void {
    this.ehAutenticacaoAuth = autenticacaoAuth;
    this.spinner.show();

    this.usuarioService
      .obterUsuarioPorEmailESenha(email, senha, autenticacaoAuth)
      .subscribe({
        next: (result: any) => {
          this.localStorageService.adicionarChave(LocalStorageChave.Valor, this.encriptar.encrypt(result.token));

          if (result.length !== 0) {
            this.router.navigate(["dashboard"]);
          }
        },
        error: (error: unknown) => {
          if (error["status"] == 400 && this.ehAutenticacaoAuth) {
            this.router.navigate(["register"], { queryParams: { email: this.usuarioAuth.email } });
            this.mostrarAvisoInfo('Para continuar, é necessário preencher o formulário.');
          } else {
            this.mostrarAvisoErro(error, "Houve um erro ao fazer login.")
          }
        },
      })
      .add(() => this.spinner.hide());
  }

  private removerToken() {
    this.localStorageService.removerChave(LocalStorageChave.Valor);
  }

  public validarCamposFormulario(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.minLength(10), Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  private autoLogin() {
    const token = this.localStorageService.obterChave(LocalStorageChave.Valor);
    const lembrarMe = this.localStorageService.obterChave(LocalStorageChave.LembrarMe);

    if (token && lembrarMe == "sim") {
      this.router.navigate(["dashboard"]);
    }
  }
}
