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
exports.MovimentacaoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var movimentacao_equipamento_enum_1 = require("@nvs-enum/movimentacao-equipamento.enum");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var moment = require("moment");
var MovimentacaoComponent = /** @class */ (function () {
    function MovimentacaoComponent(fb, toaster, spinner, router, movimentacaoService, token, encriptacao, activatedRoute) {
        var _this = this;
        this.fb = fb;
        this.toaster = toaster;
        this.spinner = spinner;
        this.router = router;
        this.movimentacaoService = movimentacaoService;
        this.token = token;
        this.encriptacao = encriptacao;
        this.activatedRoute = activatedRoute;
        this.movimentacao = {};
        this.codigoMovimentacao = 0;
        this.estadoSalvar = 'realizarMovimentacao';
        this.limpandoCampo = false;
        this.situacaoMovimentoEnum = movimentacao_equipamento_enum_1.MovimentacaoEquipamento;
        this.valorSituacaoMovimento = "2";
        this.chaveSituacaoMovimento = Object.keys(this.situacaoMovimentoEnum).filter(Number);
        this.activatedRoute.queryParams.subscribe(function (parametro) {
            _this.codigoPatrimonio = +_this.encriptacao.decrypt(parametro['codigoPatrimonio']);
            _this.nomePatrimonio = parametro['nomePatrimonio'];
        });
    }
    Object.defineProperty(MovimentacaoComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    MovimentacaoComponent.prototype.ngOnInit = function () {
        this.validacao();
        this.carregarMovimentacao();
    };
    MovimentacaoComponent.prototype.limparCampos = function () {
        this.limpandoCampo = true;
        this.validacao();
    };
    MovimentacaoComponent.prototype.validacao = function () {
        this.form = this.fb.group({
            codigoMovimentacao: new forms_1.FormControl(this.limpandoCampo ? this.form.get('codigoMovimentacao').value : 0, []),
            dataApropriacao: new forms_1.FormControl('', [forms_1.Validators.required]),
            dataDevolucao: new forms_1.FormControl(''),
            observacao: new forms_1.FormControl(''),
            movimentacaoDoEquipamento: new forms_1.FormControl(+movimentacao_equipamento_enum_1.MovimentacaoEquipamento['Em Uso'], [forms_1.Validators.required]),
            codigoPatrimonio: new forms_1.FormControl(this.codigoPatrimonio),
            codigoUsuario: new forms_1.FormControl(this.token.obterCodigoUsuarioToken()),
            nomeUsuario: new forms_1.FormControl(this.token.obterNomeUsuarioToken()),
            patrimonio: new forms_1.FormControl(this.nomePatrimonio)
        });
    };
    MovimentacaoComponent.prototype.salvarAlteracao = function () {
        var _this = this;
        var atualizando = this.estadoSalvar == 'atualizarMovimentacao';
        var nomeAcaoRealizada = atualizando ? 'atualizado' : 'realizada';
        this.spinner.show(nomeAcaoRealizada);
        this.movimentacao = (this.estadoSalvar === 'realizarMovimentacao') ? __assign({}, this.form.value) : __assign({ codigoMovimentacao: this.movimentacao.codigoMovimentacao }, this.form.value);
        this.formatarDatas();
        this.converterEnumEquipamentoParaNumeros();
        this.movimentacaoService[this.estadoSalvar](this.movimentacao).subscribe(function () { return _this.toaster.success("Movimenta\u00E7\u00E3o " + nomeAcaoRealizada + " com sucesso", 'Sucesso!'); }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem](MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "usuário", ['o', 'do']) + " Mensagem: " + template.mensagemErro, 'Erro!');
        }, function () {
            setTimeout(function () {
                _this.router.navigate(['dashboard/movimentacao/listagem'], { queryParams: { codigoPatrimonio: _this.encriptacao.encrypt(_this.movimentacao.codigoPatrimonio.toString()) } });
            }, 1700);
        }).add(function () { return _this.spinner.hide(nomeAcaoRealizada); });
    };
    MovimentacaoComponent.prototype.formatarDatas = function () {
        var dataApropriacao = this.form.controls['dataApropriacao'].value;
        var dataDevolucao = this.form.controls['dataDevolucao'].value;
        this.movimentacao.dataApropriacao = new Date(moment(dataApropriacao).subtract(3, 'hours').toISOString());
        if (typeof dataDevolucao != 'undefined') {
            this.movimentacao.dataDevolucao = moment(dataDevolucao).local().subtract(3, 'hours').toISOString();
        }
    };
    MovimentacaoComponent.prototype.converterEnumEquipamentoParaNumeros = function () {
        this.movimentacao.movimentacaoDoEquipamento = +this.form.controls['movimentacaoDoEquipamento'].value;
    };
    MovimentacaoComponent.prototype.carregarMovimentacao = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (parametro) { _this.codigoMovimentacao = parametro['codigoMovimentacao']; });
        if (typeof this.codigoMovimentacao !== 'undefined' && this.codigoMovimentacao !== 0) {
            this.estadoSalvar = 'atualizarMovimentacao';
            this.spinner.show('carregando');
            this.movimentacaoService.obterApenasUmaMovimentacao(this.codigoMovimentacao).subscribe({
                next: function (movimentacao) {
                    _this.movimentacao = __assign({}, movimentacao);
                    _this.form.patchValue(_this.movimentacao);
                    _this.valorSituacaoMovimento = _this.movimentacao.movimentacaoDoEquipamento.toString();
                    _this.form.controls['patrimonio'].setValue(movimentacao.tipoEquipamento + " - " + movimentacao.nomeFuncionario);
                },
                error: function (error) {
                    var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                    _this.toaster[template.tipoMensagem]("Houve um erro ao tentar carregar a movimenta\u00E7\u00E3o. Mensagem: " + template.mensagemErro, template.titulo);
                }
            }).add(function () { return _this.spinner.hide('carregando'); });
        }
    };
    MovimentacaoComponent = __decorate([
        core_1.Component({
            selector: 'app-movimentacao',
            templateUrl: './movimentacao.component.html',
            styleUrls: ['./movimentacao.component.sass', '../../../assets/style-base.sass']
        })
    ], MovimentacaoComponent);
    return MovimentacaoComponent;
}());
exports.MovimentacaoComponent = MovimentacaoComponent;
