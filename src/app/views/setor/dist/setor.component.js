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
exports.SetorComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var classes_sass_constant_1 = require("src/app/utils/classes-sass.constant");
var SetorComponent = /** @class */ (function () {
    function SetorComponent(fb, setorService, toaster, spinner, activateRouter, router) {
        this.fb = fb;
        this.setorService = setorService;
        this.toaster = toaster;
        this.spinner = spinner;
        this.activateRouter = activateRouter;
        this.router = router;
        this.limpandoCampo = false;
        this.setor = {};
        this.estadoSalvar = 'cadastrarSetor';
        this.classeBotaoLimpar = classes_sass_constant_1.CLASSE_BOTAO_LIMPAR;
    }
    Object.defineProperty(SetorComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    SetorComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarSetor();
    };
    SetorComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoSetor: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoSetor').value : 0, []),
            nome: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(50)])
        });
    };
    SetorComponent.prototype.cssValidator = function (campoForm) {
        return { 'is-invalid': campoForm.errors && campoForm.touched };
    };
    SetorComponent.prototype.limparCampos = function () {
        this.limpandoCampo = true;
        this.validacao();
    };
    SetorComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarSetor';
        var nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';
        this.spinner.show(nomeAcaoRealizada);
        this.setor = (this.estadoSalvar === 'cadastrarSetor') ? __assign({}, this.form.value) : __assign({ codigoSetor: this.setor.codigoSetor }, this.form.value);
        this.setorService[this.estadoSalvar](this.setor).subscribe(function () { return _this.toaster.success("Setor " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "setor", ['o', 'do']) + " Mensagem: " + template.mensagemErro, 'Erro!');
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/setor/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    SetorComponent.prototype.carregarSetor = function () {
        var _this = this;
        this.codigoSetor = +this.activateRouter.snapshot.paramMap.get('codigoSetor');
        if (this.codigoSetor !== null && this.codigoSetor !== 0) {
            this.estadoSalvar = 'atualizarSetor';
            this.spinner.show('carregando');
            this.setorService.obterApenasUmSetor(this.codigoSetor).subscribe({
                next: function (setor) {
                    _this.setor = __assign({}, setor);
                    _this.form.patchValue(_this.setor);
                },
                error: function (error) {
                    var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
                    _this.toaster[template.tipoMensagem]("Houve um erro ao carregar o setor. Mensagem: " + template.mensagemErro, template.titulo);
                }
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    SetorComponent = __decorate([
        core_1.Component({
            selector: 'app-setor',
            templateUrl: './setor.component.html',
            styleUrls: ['./setor.component.sass', '../../../assets/style-base.sass']
        })
    ], SetorComponent);
    return SetorComponent;
}());
exports.SetorComponent = SetorComponent;
