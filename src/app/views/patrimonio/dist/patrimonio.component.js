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
exports.PatrimonioComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var situacao_equipamento_enum_1 = require("@nvs-enum/situacao-equipamento.enum");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var PatrimonioComponent = /** @class */ (function () {
    function PatrimonioComponent(fb, fbe, funcionario, equipamento, patrimonioService, toaster, token, spinner, router, activatedRoute) {
        this.fb = fb;
        this.fbe = fbe;
        this.funcionario = funcionario;
        this.equipamento = equipamento;
        this.patrimonioService = patrimonioService;
        this.toaster = toaster;
        this.token = token;
        this.spinner = spinner;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.form = {};
        this.formAdicional = {};
        this.funcionarios = [];
        this.equipamentos = [];
        this.patrimonio = {};
        this.informacaoAdicional = {};
        this.situacaoEquipamentoEnum = situacao_equipamento_enum_1.SituacaoEquipamento;
        this.limpandoCampo = false;
        this.estadoSalvar = 'cadastrarPatrimonio';
        this.valorAtualSituacaoEquipamento = "2";
        this.chaveSituacaoEquipamento = Object.keys(this.situacaoEquipamentoEnum).filter(Number);
    }
    Object.defineProperty(PatrimonioComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PatrimonioComponent.prototype, "fa", {
        get: function () {
            return this.formAdicional.controls;
        },
        enumerable: false,
        configurable: true
    });
    PatrimonioComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarPatrimonio';
        var nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';
        this.spinner.show(nomeAcaoRealizada);
        this.patrimonio = (this.estadoSalvar === 'cadastrarPatrimonio') ? __assign({}, this.form.value) : __assign({ codigoPatrimonio: this.patrimonio.codigoPatrimonio }, this.form.value);
        this.patrimonio.situacaoEquipamento = +this.form.controls['situacaoEquipamento'].value;
        this.informacaoAdicional = (this.estadoSalvar === 'cadastrarPatrimonio') ? __assign({}, this.formAdicional.value) : __assign({ codigoInformacaoAdicional: this.informacaoAdicional.codigoInformacaoAdicional }, this.formAdicional.value);
        this.patrimonioService[this.estadoSalvar](this.patrimonio, this.informacaoAdicional).subscribe(function () { return _this.toaster.success("Patrim\u00F4nio " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "patrimônio", ['o', 'do']) + " Mensagem: " + template.mensagemErro, 'Erro!');
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/patrimonio/listagem']);
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    PatrimonioComponent.prototype.limparCampos = function () {
        this.limpandoCampo = true;
        this.validarCamposPatrimonio();
        this.validarCamposInformacaoAdicional();
    };
    PatrimonioComponent.prototype.ngOnInit = function () {
        this.validarCamposPatrimonio();
        this.validarCamposInformacaoAdicional();
        this.carregarPatrimonio();
        this.obterFuncionarios();
        this.obterEquipamentos();
    };
    PatrimonioComponent.prototype.carregarPatrimonio = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (parametro) { _this.codigoPatrimonio = parametro['codigoPatrimonio'], _this.serviceTag = parametro['serviceTag']; });
        if (this.codigoPatrimonio !== null && this.codigoPatrimonio !== 0 && typeof this.codigoPatrimonio != 'undefined') {
            this.estadoSalvar = 'atualizarPatrimonio';
            this.spinner.show('carregando');
            this.patrimonioService.obterPatrimonioEInformacaoAdicional(this.codigoPatrimonio).subscribe(function (listaDeResposta) {
                _this.form.patchValue(listaDeResposta[0]);
                _this.serviceTag = listaDeResposta[0].serviceTag;
                _this.formAdicional.patchValue(listaDeResposta[1]);
                _this.nomeFantasiaEmpresaPadrao = listaDeResposta[2];
                _this.valorAtualSituacaoEquipamento = listaDeResposta[0].situacaoEquipamento.toString();
            }, function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao tentar carregar o patrim\u00F4nio. Mensagem: " + template.mensagemErro, template.titulo);
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    PatrimonioComponent.prototype.obterEquipamentos = function () {
        var _this = this;
        this.equipamento.obterTodosEquipamentos().subscribe(function (result) {
            _this.equipamentos = result;
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um problema ao carregar os equipamentos. Mensagem: " + template.mensagemErro, template.titulo);
        }, function () { });
    };
    PatrimonioComponent.prototype.obterFuncionarios = function () {
        var _this = this;
        this.funcionario.obterTodosFuncionarios().subscribe(function (result) {
            _this.funcionarios = result;
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um problema ao carregar os funcion\u00E1rios. Mensagem: " + template.mensagemErro, 'Erro!');
        });
    };
    PatrimonioComponent.prototype.validarCamposPatrimonio = function () {
        this.form = this.fb.group({
            codigoPatrimonio: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoPatrimonio').value : 0, []),
            codigoTipoEquipamento: new forms_1.FormControl('', [forms_1.Validators.required]),
            tipoEquipamento: new forms_1.FormControl(''),
            codigoFuncionario: new forms_1.FormControl('', [forms_1.Validators.required]),
            nomeFuncionario: new forms_1.FormControl(''),
            codigoUsuario: new forms_1.FormControl(this.token.obterCodigoUsuarioToken()),
            nomeUsuario: new forms_1.FormControl(this.token.obterNomeUsuarioToken()),
            armazenamento: new forms_1.FormControl(''),
            mac: new forms_1.FormControl(''),
            memoriaRAM: new forms_1.FormControl(''),
            modelo: new forms_1.FormControl(''),
            placaDeVideo: new forms_1.FormControl(''),
            processador: new forms_1.FormControl(''),
            serviceTag: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(20)]),
            situacaoEquipamento: new forms_1.FormControl()
        });
    };
    PatrimonioComponent.prototype.validarCamposInformacaoAdicional = function () {
        this.formAdicional = this.fbe.group({
            codigoInformacaoAdicional: new forms_1.FormControl(this.limpandoCampo ? this.formAdicional.get('codigoInformacaoAdicional').value : 0, []),
            versaoWindows: new forms_1.FormControl(''),
            antivirus: new forms_1.FormControl(''),
            dataCompra: new forms_1.FormControl(new Date(Date.now()).toISOString()),
            dataExpiracaoGarantia: new forms_1.FormControl(new Date(Date.now()).toISOString()),
            valorPago: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    PatrimonioComponent = __decorate([
        core_1.Component({
            selector: 'app-patrimonio',
            templateUrl: './patrimonio.component.html',
            styleUrls: ['./patrimonio.component.sass', '../../../assets/style-base.sass']
        })
    ], PatrimonioComponent);
    return PatrimonioComponent;
}());
exports.PatrimonioComponent = PatrimonioComponent;
