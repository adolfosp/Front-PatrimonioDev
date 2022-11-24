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
exports.FabricanteComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var FabricanteComponent = /** @class */ (function () {
    function FabricanteComponent(fb, fabricanteService, toaster, spinner, router, activateRouter) {
        this.fb = fb;
        this.fabricanteService = fabricanteService;
        this.toaster = toaster;
        this.spinner = spinner;
        this.router = router;
        this.activateRouter = activateRouter;
        this.fabricante = {};
        this.estadoSalvar = 'cadastrarFabricante';
        this.limpandoCampo = false;
    }
    Object.defineProperty(FabricanteComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    FabricanteComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarFabricante();
    };
    FabricanteComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoFabricante: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoFabricante').value : 0, []),
            nomeFabricante: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(60)])
        });
    };
    FabricanteComponent.prototype.limparCampos = function () {
        this.limpandoCampo = true;
        this.validacao();
    };
    FabricanteComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarFabricante';
        var nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';
        this.spinner.show(nomeAcaoRealizada);
        this.fabricante = (this.estadoSalvar === 'cadastrarFabricante') ? __assign({}, this.form.value) : __assign({ codigoFabricante: this.fabricante.codigoFabricante }, this.form.value);
        this.fabricanteService[this.estadoSalvar](this.fabricante).subscribe(function () { return _this.toaster.success("Fabricante " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "fabricante", ['o', 'do']) + " Mensagem: " + template.mensagemErro, template.titulo);
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/fabricante/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    FabricanteComponent.prototype.carregarFabricante = function () {
        var _this = this;
        this.codigoFabricante = +this.activateRouter.snapshot.paramMap.get('codigoFabricante');
        if (this.codigoFabricante !== null && this.codigoFabricante !== 0) {
            this.estadoSalvar = 'atualizarFabricante';
            this.spinner.show('carregando');
            this.fabricanteService.obterApenasUmFabricante(this.codigoFabricante).subscribe({
                next: function (fabricante) {
                    _this.fabricante = __assign({}, fabricante);
                    _this.form.patchValue(_this.fabricante);
                },
                error: function (error) {
                    var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                    _this.toaster[template.tipoMensagem]("Houve um erro ao tentar carregar o fabricante. Mensagem: " + template.mensagemErro, template.titulo);
                }
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    FabricanteComponent = __decorate([
        core_1.Component({
            selector: 'app-fabricante',
            templateUrl: './fabricante.component.html',
            styleUrls: ['./fabricante.component.sass', '../../../assets/style-base.sass']
        })
    ], FabricanteComponent);
    return FabricanteComponent;
}());
exports.FabricanteComponent = FabricanteComponent;
