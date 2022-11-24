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
exports.RegistrarComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DarkModeImagemHelper_1 = require("@nvs-helpers/DarkModeImagemHelper");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ModoDarkLightHelper_1 = require("@nvs-helpers/ModoDarkLightHelper");
var ValidacaoSenhaHelper_1 = require("@nvs-helpers/ValidacaoSenhaHelper");
var RegistrarComponent = /** @class */ (function () {
    function RegistrarComponent(fb, spinner, usuarioService, toaster, router) {
        this.fb = fb;
        this.spinner = spinner;
        this.usuarioService = usuarioService;
        this.toaster = toaster;
        this.router = router;
        this.usuario = {};
        var emailURL = this.router.getCurrentNavigation().extras;
        this.emailAuth = typeof emailURL.queryParams == 'undefined' ? '' : emailURL.queryParams['email'];
    }
    Object.defineProperty(RegistrarComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    RegistrarComponent.prototype.ngOnInit = function () {
        this.validarCamposFormulario();
        this.alternarImagemDarkMode();
    };
    RegistrarComponent.prototype.alternarImagemDarkMode = function () {
        var darkModeImagem = new DarkModeImagemHelper_1.DarkModeImagemHelper('assets/img/novo-registro-dark.gif', 'assets/img/novo-registro.gif', 'imagem-novo-registro');
        darkModeImagem.alternarImagemDeAcordoComOModo();
        ModoDarkLightHelper_1.atribuirTemaCorretoAoRecarregarPagina();
    };
    RegistrarComponent.prototype.validarCamposFormulario = function () {
        var formOptions = {
            validators: ValidacaoSenhaHelper_1.ValidacaoCampoSenha.MustMatch('senha', 'confirmeSenha')
        };
        this.form = this.fb.group({
            codigoUsuario: new forms_1.FormControl(''),
            codigoUsuarioPermissao: new forms_1.FormControl(3),
            codigoEmpresa: new forms_1.FormControl(1),
            codigoSetor: new forms_1.FormControl(1),
            codigoPerfil: new forms_1.FormControl(3),
            nome: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(25)]),
            email: new forms_1.FormControl(this.emailAuth, [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.email]),
            confirmeSenha: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(25)]),
            senha: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(25)]),
            ativo: new forms_1.FormControl(true, [])
        }, formOptions);
    };
    RegistrarComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        this.usuario = __assign({}, this.form.value);
        this.spinner.show();
        this.usuarioService.cadastrarUsuario(this.usuario).subscribe(function () { return _this.toaster.success('Usuário cadastrado com sucesso. Redirecionando para a tela de login', 'Sucesso!'); }, function (error) {
            _this.toaster.toastrConfig.timeOut = 2000;
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro durante o cadastro do usu\u00E1rio. Mensagem " + template.mensagemErro, 'Erro');
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['login']);
            }, 2000);
        }).add(function () { return _this.spinner.hide(); });
    };
    RegistrarComponent = __decorate([
        core_1.Component({
            selector: 'app-registrar',
            styleUrls: ['../../../../assets/style-base.sass', './registrar.component.sass'],
            templateUrl: 'registrar.component.html'
        })
    ], RegistrarComponent);
    return RegistrarComponent;
}());
exports.RegistrarComponent = RegistrarComponent;
