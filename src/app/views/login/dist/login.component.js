"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var angularx_social_login_1 = require("@abacritt/angularx-social-login");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var local_storage_chave_enum_1 = require("@nvs-enum/local-storage-chave.enum");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ModoDarkLightHelper_1 = require("@nvs-helpers/ModoDarkLightHelper");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(usuarioService, fb, toaster, router, spinner, authService, encriptar, localStorageService) {
        this.usuarioService = usuarioService;
        this.fb = fb;
        this.toaster = toaster;
        this.router = router;
        this.spinner = spinner;
        this.authService = authService;
        this.encriptar = encriptar;
        this.localStorageService = localStorageService;
    }
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.authState.subscribe(function (user) {
            if (typeof user !== 'undefined' || user !== null) {
                _this.realizarRequisicaoObterUsuario(user.email, "1e9g63", true);
            }
        });
        this.validarCamposFormulario();
        this.atribuirValorLembrarMe();
        this.autoLogin();
        this.atribuirTipoModoVisualizacaoPadrao();
    };
    LoginComponent.prototype.atribuirTipoModoVisualizacaoPadrao = function () {
        if (this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.DarkMode) == '') {
            ModoDarkLightHelper_1.atribuirModoDarkLightPadrao();
            return;
        }
        ModoDarkLightHelper_1.atribuirTemaCorretoAoRecarregarPagina();
    };
    LoginComponent.prototype.alterarLembrarMe = function () {
        var decisaoUsuario = this.lembrarMe == true ? 'sim' : 'nao';
        this.localStorageService.adicionarChave(local_storage_chave_enum_1.LocalStorageChave.LembrarMe, decisaoUsuario);
    };
    LoginComponent.prototype.atribuirValorLembrarMe = function () {
        var valor = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.LembrarMe);
        this.lembrarMe = valor == 'sim';
    };
    LoginComponent.prototype.googleLogIn = function () {
        return rxjs_1.from(this.authService.signIn(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID));
    };
    LoginComponent.prototype.signInWithFB = function () {
        return rxjs_1.from(this.authService.signIn(angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID));
    };
    LoginComponent.prototype.logarComFacebook = function () {
        var _this = this;
        this.signInWithFB().subscribe(function (result) {
            _this.usuarioAuth = result;
        }, function (error) {
            if (error["error"] !== "popup_closed_by_user")
                _this.toaster.error("Houve um erro ao fazer login com a conta da Google. Mensagem : " + error["error"]);
        }, function () {
            //TODO: Realizar tudo por post
            _this.realizarRequisicaoObterUsuario(_this.usuarioAuth.email, "1e9g63", true);
        });
    };
    LoginComponent.prototype.validarCredenciais = function () {
        this.removerToken();
        this.spinner.show();
        var credenciais = __assign({}, this.form.value);
        this.realizarRequisicaoObterUsuario(credenciais.email, credenciais.senha, false);
    };
    LoginComponent.prototype.realizarRequisicaoObterUsuario = function (email, senha, autenticacaoAuth) {
        var _this = this;
        this.ehAutenticacaoAuth = autenticacaoAuth;
        this.spinner.show();
        this.usuarioService.obterUsuarioPorEmailESenha(email, senha, autenticacaoAuth).subscribe({
            next: function (result) {
                debugger;
                _this.localStorageService.adicionarChave(local_storage_chave_enum_1.LocalStorageChave.Valor, _this.encriptar.encrypt(result.token));
                if (result.length !== 0) {
                    _this.router.navigate(['dashboard']);
                }
            },
            error: function (error) {
                _this.toaster.toastrConfig.timeOut = 5000;
                if (error["status"] == 400 && _this.ehAutenticacaoAuth) {
                    _this.router.navigate(["register"], { queryParams: { email: _this.usuarioAuth.email } });
                    _this.toaster.info("Para continuar, \u00E9 necess\u00E1rio preencher o formul\u00E1rio.");
                }
                else {
                    var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
                    _this.toaster[template.tipoMensagem]("Houve um erro ao fazer login. Mensagem: " + template.mensagemErro, template.titulo);
                }
            }
        }).add(function () { return _this.spinner.hide(); });
    };
    LoginComponent.prototype.removerToken = function () {
        this.localStorageService.removerChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
    };
    LoginComponent.prototype.validarCamposFormulario = function () {
        this.form = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.email]],
            senha: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]]
        });
    };
    LoginComponent.prototype.autoLogin = function () {
        var token = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
        var lembrarMe = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.LembrarMe);
        if (token && lembrarMe == 'sim') {
            this.router.navigate(['dashboard']);
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            styleUrls: ['./login.component.sass', '../../../assets/style-base.sass'],
            templateUrl: 'login.component.html'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
