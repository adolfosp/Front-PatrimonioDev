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
exports.EmpresaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var classes_sass_constant_1 = require("src/app/utils/classes-sass.constant");
var EmpresaComponent = /** @class */ (function () {
    function EmpresaComponent(fb, spinner, toaster, router, empresaService, activateRouter) {
        this.fb = fb;
        this.spinner = spinner;
        this.toaster = toaster;
        this.router = router;
        this.empresaService = empresaService;
        this.activateRouter = activateRouter;
        this.empresa = {};
        this.limpandoCampo = false;
        this.estadoSalvar = 'cadastrarEmpresa';
        this.classeBotaoLimpar = classes_sass_constant_1.CLASSE_BOTAO_LIMPAR;
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
        this.limpandoCampo = true;
        this.validacao();
    };
    EmpresaComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoEmpresa: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoEmpresa').value : 0, []),
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
        this.empresa = (this.estadoSalvar === 'cadastrarEmpresa') ? __assign({}, this.form.value) : __assign({ codigoEmpresa: this.empresa.codigoEmpresa }, this.form.value);
        this.empresaService[this.estadoSalvar](this.empresa).subscribe(function () { return _this.toaster.success("Empresa " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "empresa", ['o', 'da']) + " Mensagem: " + template.mensagemErro, template.titulo);
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/empresa/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    EmpresaComponent.prototype.carregarEmpresa = function () {
        var _this = this;
        this.codigoEmpresa = +this.activateRouter.snapshot.paramMap.get('codigoEmpresa');
        if (this.codigoEmpresa !== null && this.codigoEmpresa !== 0) {
            this.estadoSalvar = 'atualizarEmpresa';
            this.spinner.show('carregando');
            this.empresaService.obterApenasUmaEmpresa(this.codigoEmpresa).subscribe({
                next: function (empresa) {
                    _this.empresa = __assign({}, empresa);
                    _this.form.patchValue(_this.empresa);
                },
                error: function (error) {
                    var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
                    _this.toaster[template.tipoMensagem]("Houve um problema ao carregar a empresa. Mensagem: " + template.mensagemErro, template.titulo);
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
}());
exports.EmpresaComponent = EmpresaComponent;
