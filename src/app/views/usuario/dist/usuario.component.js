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
exports.UsuarioComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ValidacaoSenhaHelper_1 = require("@nvs-helpers/ValidacaoSenhaHelper");
var classes_sass_constant_1 = require("@nvs-utils/classes-sass.constant");
var UsuarioComponent = /** @class */ (function () {
    function UsuarioComponent(fb, toaster, spinner, setorService, empresaService, permissaoService, router, usuarioService, activateRouter) {
        this.fb = fb;
        this.toaster = toaster;
        this.spinner = spinner;
        this.setorService = setorService;
        this.empresaService = empresaService;
        this.permissaoService = permissaoService;
        this.router = router;
        this.usuarioService = usuarioService;
        this.activateRouter = activateRouter;
        this.usuario = {};
        this.estadoSalvar = 'cadastrarUsuario';
        this.setores = [];
        this.empresas = [];
        this.permissoes = [];
        this.limpandoCampo = false;
        this.classeBotaoLimpar = classes_sass_constant_1.CLASSE_BOTAO_LIMPAR;
    }
    Object.defineProperty(UsuarioComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    UsuarioComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarUsuario();
        this.carregarSetor();
        this.carregarEmpresa();
        this.carregarPermissao();
        this.controlarVisibilidadeCampoAtivo();
    };
    UsuarioComponent.prototype.controlarVisibilidadeCampoAtivo = function () {
        if (this.estadoSalvar == 'cadastrarUsuario')
            this.form.controls['ativo'].disable();
        else
            this.form.controls['ativo'].enable();
    };
    UsuarioComponent.prototype.carregarSetor = function () {
        var _this = this;
        this.setorService.obterSetor().subscribe(function (setores) {
            _this.setores = setores;
        }, function (error) {
            _this.toaster.error("Houve um erro ao carregar o setor. Mensagem " + error.message, 'Erro!');
        });
    };
    UsuarioComponent.prototype.carregarEmpresa = function () {
        var _this = this;
        this.empresaService.obterEmpresas().subscribe(function (empresas) {
            _this.empresas = empresas;
        }, function (error) {
            _this.toaster.error("Houve um erro ao carregar a empresa. Mensagem " + error.message, 'Erro!');
        });
    };
    UsuarioComponent.prototype.limparCampos = function () {
        this.limpandoCampo = true;
        this.validacao();
    };
    UsuarioComponent.prototype.carregarPermissao = function () {
        var _this = this;
        this.permissaoService.obterPermissoes().subscribe(function (permissoes) {
            _this.permissoes = permissoes;
        }, function (error) {
            _this.toaster.error("Houve um erro ao carregar a permiss\u00E3o. Mensagem " + error.message, 'Erro!');
        });
    };
    UsuarioComponent.prototype.validacao = function () {
        var formOptions = {
            validators: ValidacaoSenhaHelper_1.ValidacaoCampoSenha.MustMatch('senha', 'confirmeSenha')
        };
        this.form = this.fb.group({
            codigoUsuario: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoUsuario').value : 0, []),
            codigoPerfil: new forms_1.FormControl('', [forms_1.Validators.required]),
            codigoEmpresa: new forms_1.FormControl('', [forms_1.Validators.required]),
            codigoSetor: new forms_1.FormControl('', [forms_1.Validators.required]),
            nome: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(25)]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.email]),
            confirmeSenha: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(25)]),
            senha: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(25)]),
            ativo: new forms_1.FormControl(true)
        }, formOptions);
    };
    UsuarioComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarUsuario';
        var nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';
        this.spinner.show(nomeAcaoRealizada);
        this.usuario = (this.estadoSalvar === 'cadastrarUsuario') ? __assign({}, this.form.value) : __assign({ codigoUsuario: this.usuario.codigoUsuario }, this.form.value);
        debugger;
        this.usuarioService[this.estadoSalvar](this.usuario).subscribe(function () { return _this.toaster.success("Usu\u00E1rio " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "usuário", ['o', 'do']) + " Mensagem: " + template.mensagemErro, 'Erro!');
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/usuario/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    UsuarioComponent.prototype.carregarUsuario = function () {
        var _this = this;
        this.codigoUsuario = +this.activateRouter.snapshot.paramMap.get('codigoUsuario');
        if (this.codigoUsuario !== null && this.codigoUsuario !== 0) {
            this.estadoSalvar = 'atualizarUsuario';
            this.spinner.show('carregando');
            this.usuarioService.obterApenasUmUsuario(this.codigoUsuario).subscribe({
                next: function (usuario) {
                    _this.usuario = __assign({}, usuario);
                    _this.form.patchValue(_this.usuario);
                    _this.form.controls['confirmeSenha'].setValue(usuario.senha);
                },
                error: function (error) {
                    _this.toaster.error("Houve um erro ao tentar carregar o usu\u00E1rio. Mensagem: " + error.message, 'Erro!');
                }
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    UsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-usuario',
            templateUrl: './usuario.component.html',
            styleUrls: ['./usuario.component.sass', '../../../assets/style-base.sass']
        })
    ], UsuarioComponent);
    return UsuarioComponent;
}());
exports.UsuarioComponent = UsuarioComponent;
