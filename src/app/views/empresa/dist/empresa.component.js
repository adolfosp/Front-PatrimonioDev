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
exports.EmpresaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var Componente_1 = require("@nvs-models/Componente");
var classes_sass_constant_1 = require("src/app/utils/classes-sass.constant");
var EmpresaComponent = /** @class */ (function (_super) {
    __extends(EmpresaComponent, _super);
    function EmpresaComponent(fb, spinner, toaster, router, empresaService, activateRouter) {
        var _this = _super.call(this, toaster) || this;
        _this.fb = fb;
        _this.spinner = spinner;
        _this.toaster = toaster;
        _this.router = router;
        _this.empresaService = empresaService;
        _this.activateRouter = activateRouter;
        _this._empresa = {};
        _this._limpandoCampo = false;
        _this.estadoSalvar = 'cadastrarEmpresa';
        _this.classeBotaoLimpar = classes_sass_constant_1.CLASSE_BOTAO_LIMPAR;
        return _this;
    }
    Object.defineProperty(EmpresaComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    EmpresaComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarEmpresa();
    };
    EmpresaComponent.prototype.limparCampos = function () {
        this._limpandoCampo = true;
        this.validacao();
    };
    EmpresaComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoEmpresa: new forms_1.FormControl(this._limpandoCampo ? this.form.get('codigoEmpresa').value : 0, []),
            nomeFantasia: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(70)]),
            cnpj: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(18), forms_1.Validators.maxLength(18)]),
            razaoSocial: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(70)]),
            empresaPadraoImpressao: new forms_1.FormControl(false)
        });
    };
    EmpresaComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarEmpresa';
        var nomeAcaoRealizada = atualizando ? 'atualizada' : 'cadastrada';
        this.spinner.show(nomeAcaoRealizada);
        this._empresa = (this.estadoSalvar === 'cadastrarEmpresa') ? __assign({}, this.form.value) : __assign({ codigoEmpresa: this._empresa.codigoEmpresa }, this.form.value);
        this.empresaService[this.estadoSalvar](this._empresa).subscribe(function () { return _this.mostrarAvisoSucesso("Empresa " + nomeAcaoRealizada + " com sucesso"); }, function (error) {
            _this.mostrarAvisoErro(error, "" + MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "empresa", ['o', 'da']));
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/empresa/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    EmpresaComponent.prototype.carregarEmpresa = function () {
        var _this = this;
        this._codigoEmpresa = +this.activateRouter.snapshot.paramMap.get('codigoEmpresa');
        if (this._codigoEmpresa !== null && this._codigoEmpresa !== 0) {
            this.estadoSalvar = 'atualizarEmpresa';
            this.spinner.show('carregando');
            this.empresaService.obterApenasUmaEmpresa(this._codigoEmpresa).subscribe({
                next: function (dados) {
                    _this._empresa = __assign({}, dados.data);
                    _this.form.patchValue(_this._empresa);
                },
                error: function (error) {
                    _this.mostrarAvisoErro(error, "Houve um problema ao carregar a empresa.");
                }
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    EmpresaComponent = __decorate([
        core_1.Component({
            selector: 'app-empresa',
            templateUrl: './empresa.component.html',
            styleUrls: ['./empresa.component.sass', '../../../assets/style-base.sass']
        })
    ], EmpresaComponent);
    return EmpresaComponent;
}(Componente_1["default"]));
exports.EmpresaComponent = EmpresaComponent;
