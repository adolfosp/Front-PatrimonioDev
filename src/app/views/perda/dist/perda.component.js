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
exports.PerdaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var PerdaComponent = /** @class */ (function () {
    function PerdaComponent(fb, perdaService, spinner, toaster) {
        this.fb = fb;
        this.perdaService = perdaService;
        this.spinner = spinner;
        this.toaster = toaster;
        this.podeFecharModal = new core_1.EventEmitter();
        this.perda = {};
    }
    Object.defineProperty(PerdaComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    PerdaComponent.prototype.ngOnInit = function () {
        this.validacao();
    };
    PerdaComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoPerdaEquipamento: new forms_1.FormControl(),
            motivoDaPerda: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(30), forms_1.Validators.maxLength(300)]),
            codigoPatrimonio: new forms_1.FormControl('')
        });
    };
    PerdaComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        this.spinner.show();
        this.perda = __assign({}, this.form.value);
        this.perda.codigoPatrimonio = this.codigoPatrimonio;
        this.perdaService.cadastrarPerda(this.perda).subscribe(function () { return _this.toaster.success("Perda cadastrada com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao("cadastrar", "perda", ['o', 'da']) + " Mensagem: " + template.mensagemErro, template.titulo);
        }, function () {
            _this.podeFecharModal.emit(true);
        }).add(function () { return _this.spinner.hide(); });
    };
    PerdaComponent.prototype.cssValidator = function (campoForm) {
        return { 'is-invalid': campoForm.errors && campoForm.touched };
    };
    __decorate([
        core_1.Input('codigoPatrimonio')
    ], PerdaComponent.prototype, "codigoPatrimonio");
    __decorate([
        core_1.Output()
    ], PerdaComponent.prototype, "podeFecharModal");
    PerdaComponent = __decorate([
        core_1.Component({
            selector: 'app-perda',
            templateUrl: './perda.component.html',
            styleUrls: ['./perda.component.sass', '../../../assets/style-base.sass']
        })
    ], PerdaComponent);
    return PerdaComponent;
}());
exports.PerdaComponent = PerdaComponent;
