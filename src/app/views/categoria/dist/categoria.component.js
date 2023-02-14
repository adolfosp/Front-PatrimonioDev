"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CategoriaComponent = void 0;
/* eslint-disable rxjs/no-implicit-any-catch */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var Componente_1 = require("@nvs-models/Componente");
var classes_sass_constant_1 = require("src/app/utils/classes-sass.constant");
var CategoriaComponent = /** @class */ (function (_super) {
    __extends(CategoriaComponent, _super);
    function CategoriaComponent(fb, spinner, toaster, router, categoriaService, activateRouter) {
        var _this = _super.call(this, toaster) || this;
        _this.fb = fb;
        _this.spinner = spinner;
        _this.toaster = toaster;
        _this.router = router;
        _this.categoriaService = categoriaService;
        _this.activateRouter = activateRouter;
        _this._categoria = {};
        _this._limpandoCampo = false;
        _this.estadoSalvar = "cadastrarCategoria";
        _this.classeBotaoLimpar = classes_sass_constant_1.CLASSE_BOTAO_LIMPAR;
        return _this;
    }
    Object.defineProperty(CategoriaComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    CategoriaComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarCategoria();
    };
    CategoriaComponent.prototype.limparCampos = function () {
        this._limpandoCampo = true;
        this.validacao();
    };
    CategoriaComponent.prototype.validacao = function () {
        var _a;
        this.form = this.fb.group({
            codigoCategoria: new forms_1.FormControl(this._limpandoCampo ? (_a = this.form.get('codigoCategoria')) === null || _a === void 0 ? void 0 : _a.value : 0, []),
            descricao: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(50)])
        });
    };
    CategoriaComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarCategoria';
        var nomeAcaoRealizada = atualizando ? 'atualizada' : 'cadastrada';
        this.spinner.show(nomeAcaoRealizada);
        this._categoria = (this.estadoSalvar === 'cadastrarCategoria') ? __assign({}, this.form.value) : __assign({ codigoCategoria: this._categoria.codigoCategoria }, this.form.value);
        this.categoriaService[this.estadoSalvar](this._categoria).subscribe(function (dados) { return _this.mostrarAvisoSucesso(dados.mensagem); }, function (error) {
            _this.mostrarAvisoErro(error, MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "categoria", ['o', 'da']) + "}");
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/categoria/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    CategoriaComponent.prototype.carregarCategoria = function () {
        var _this = this;
        var _a;
        this._codigoCategoria = +((_a = this.activateRouter.snapshot.paramMap) === null || _a === void 0 ? void 0 : _a.get('codigoCategoria'));
        if (this._codigoCategoria == null || this._codigoCategoria == 0)
            return;
        this.estadoSalvar = 'atualizarCategoria';
        this.spinner.show('carregando');
        this.categoriaService.obterApenasUmaCategoria(this._codigoCategoria).subscribe({
            next: function (dados) {
                _this._categoria = (dados.data);
                _this.form.patchValue(_this._categoria);
            },
            error: function (error) {
                _this.mostrarAvisoErro(error, "Houve um problema ao carregar a categoria");
            }
        }).add(function () { return _this.spinner.hide('carregando'); });
    };
    CategoriaComponent = __decorate([
        core_1.Component({
            selector: 'app-categoria',
            templateUrl: './categoria.component.html',
            styleUrls: ['./categoria.component.sass', '../../../assets/style-base.sass']
        })
    ], CategoriaComponent);
    return CategoriaComponent;
}(Componente_1["default"]));
exports.CategoriaComponent = CategoriaComponent;
