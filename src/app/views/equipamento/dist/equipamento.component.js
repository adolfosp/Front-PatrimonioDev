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
exports.EquipamentoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var classes_sass_constant_1 = require("@nvs-utils/classes-sass.constant");
var EquipamentoComponent = /** @class */ (function () {
    function EquipamentoComponent(fb, spinner, toaster, router, equipamentoService, fabricanteService, categoriaService, activateRouter) {
        this.fb = fb;
        this.spinner = spinner;
        this.toaster = toaster;
        this.router = router;
        this.equipamentoService = equipamentoService;
        this.fabricanteService = fabricanteService;
        this.categoriaService = categoriaService;
        this.activateRouter = activateRouter;
        this.equipamento = {};
        this.limpandoCampo = false;
        this.estadoSalvar = 'cadastrarEquipamento';
        this.fabricantes = [];
        this.categorias = [];
        this.classeBotaoLimpar = classes_sass_constant_1.CLASSE_BOTAO_LIMPAR;
    }
    Object.defineProperty(EquipamentoComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    EquipamentoComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarFabricantes();
        this.carregarCategorias();
        this.carregarEquipamento();
    };
    EquipamentoComponent.prototype.getValues = function () {
        this.select;
    };
    EquipamentoComponent.prototype.limparCampos = function () {
        this.limpandoCampo = true;
        this.validacao();
    };
    EquipamentoComponent.prototype.carregarFabricantes = function () {
        var _this = this;
        this.fabricanteService.obterTodosFabricante().subscribe(function (result) {
            _this.fabricantes = result;
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            _this.toaster[template.tipoMensagem]("Houve um problema ao carregar os fabricante. Mensagem: " + template.mensagemErro, template.titulo);
        });
    };
    EquipamentoComponent.prototype.carregarCategorias = function () {
        var _this = this;
        this.categoriaService.obterTodasCategorias().subscribe({
            next: function (result) {
                _this.categorias = result.data;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
                _this.toaster[template.tipoMensagem]("Houve um problema ao carregar as categorias. Mensagem: " + template.mensagemErro, template.titulo);
            }
        });
    };
    EquipamentoComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoTipoEquipamento: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoTipoEquipamento').value : 0, []),
            tipoEquipamento: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(50)]),
            codigoFabricante: new forms_1.FormControl('', [forms_1.Validators.required]),
            codigoCategoria: new forms_1.FormControl('', [forms_1.Validators.required]),
            nomeFabricante: new forms_1.FormControl(''),
            nomeCategoria: new forms_1.FormControl('')
        });
    };
    EquipamentoComponent.prototype.cssValidator = function (campoForm) {
        return { 'is-invalid': campoForm.errors && campoForm.touched };
    };
    EquipamentoComponent.prototype.cssValidatorCampoSelecao = function (campoForm) {
        return { 'is-invalid': campoForm.errors };
    };
    EquipamentoComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarEquipamento';
        var nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';
        this.spinner.show(nomeAcaoRealizada);
        this.equipamento = (this.estadoSalvar === 'cadastrarEquipamento') ? __assign({}, this.form.value) : __assign({ codigoTipoEquipamento: this.equipamento.codigoTipoEquipamento }, this.form.value);
        this.equipamentoService[this.estadoSalvar](this.equipamento).subscribe(function () { return _this.toaster.success("Equipamento " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "equipamento", ['o', 'do']) + " Mensagem: " + template.mensagemErro, 'Erro!');
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/equipamento/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    EquipamentoComponent.prototype.carregarEquipamento = function () {
        var _this = this;
        this.codigoEquipamento = +this.activateRouter.snapshot.paramMap.get('codigoEquipamento');
        if (this.codigoEquipamento !== null && this.codigoEquipamento !== 0) {
            this.estadoSalvar = 'atualizarEquipamento';
            this.spinner.show('carregando');
            this.equipamentoService.obterApenasUmEquipamento(this.codigoEquipamento).subscribe({
                next: function (equipamento) {
                    _this.equipamento = __assign({}, equipamento);
                    _this.form.patchValue(_this.equipamento);
                },
                error: function (error) {
                    var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
                    _this.toaster[template.tipoMensagem]("Houve um problema ao carregar o equipamento. Mensagem: " + template.mensagemErro, 'Erro!');
                }
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    EquipamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-equipamento',
            templateUrl: './equipamento.component.html',
            styleUrls: ['./equipamento.component.sass', '../../../assets/style-base.sass']
        })
    ], EquipamentoComponent);
    return EquipamentoComponent;
}());
exports.EquipamentoComponent = EquipamentoComponent;
