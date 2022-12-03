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
exports.CategoriaComponent = void 0;
/* eslint-disable rxjs/no-implicit-any-catch */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var classes_sass_constant_1 = require("src/app/utils/classes-sass.constant");
var CategoriaComponent = /** @class */ (function () {
    function CategoriaComponent(fb, spinner, toaster, router, categoriaService, activateRouter) {
        this.fb = fb;
        this.spinner = spinner;
        this.toaster = toaster;
        this.router = router;
        this.categoriaService = categoriaService;
        this.activateRouter = activateRouter;
        this.categoria = {};
        this.limpandoCampo = false;
        this.estadoSalvar = "cadastrarCategoria";
        this.classeBotaoLimpar = classes_sass_constant_1.CLASSE_BOTAO_LIMPAR;
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
        this.limpandoCampo = true;
        this.validacao();
    };
    CategoriaComponent.prototype.validacao = function () {
        var _a;
        this.form = this.fb.group({
            codigoCategoria: new forms_1.FormControl(this.limpandoCampo ? (_a = this.form.get('codigoCategoria')) === null || _a === void 0 ? void 0 : _a.value : 0, []),
            descricao: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(50)])
        });
    };
    CategoriaComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarCategoria';
        var nomeAcaoRealizada = atualizando ? 'atualizada' : 'cadastrada';
        this.spinner.show(nomeAcaoRealizada);
        this.categoria = (this.estadoSalvar === 'cadastrarCategoria') ? __assign({}, this.form.value) : __assign({ codigoCategoria: this.categoria.codigoCategoria }, this.form.value);
        this.categoriaService[this.estadoSalvar](this.categoria).subscribe(function () { return _this.toaster.success("Categoria " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "categoria", ['o', 'da']) + " Mensagem: " + template.mensagemErro, template.titulo);
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/categoria/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    CategoriaComponent.prototype.carregarCategoria = function () {
        var _this = this;
        var _a;
        this.codigoCategoria = +((_a = this.activateRouter.snapshot.paramMap) === null || _a === void 0 ? void 0 : _a.get('codigoCategoria'));
        if (this.codigoCategoria == null || this.codigoCategoria == 0)
            return;
        this.estadoSalvar = 'atualizarCategoria';
        this.spinner.show('carregando');
        this.categoriaService.obterApenasUmaCategoria(this.codigoCategoria).subscribe({
            next: function (categoria) {
                _this.categoria = __assign({}, categoria);
                _this.form.patchValue(_this.categoria);
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
                _this.toaster[template.tipoMensagem]("Houve um problema ao carregar a categoria. Mensagem: " + template.mensagemErro, template.titulo);
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
}());
exports.CategoriaComponent = CategoriaComponent;
