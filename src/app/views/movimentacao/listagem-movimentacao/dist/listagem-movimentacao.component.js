"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemMovimentacaoComponent = void 0;
var core_1 = require("@angular/core");
var movimentacao_equipamento_enum_1 = require("@nvs-enum/movimentacao-equipamento.enum");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemMovimentacaoComponent = /** @class */ (function () {
    function ListagemMovimentacaoComponent(toaster, spinner, router, movimentacaoService, activatedRoute, encriptacao, detectorAlteracao) {
        this.toaster = toaster;
        this.spinner = spinner;
        this.router = router;
        this.movimentacaoService = movimentacaoService;
        this.activatedRoute = activatedRoute;
        this.encriptacao = encriptacao;
        this.detectorAlteracao = detectorAlteracao;
        this.data = [];
        this.linhas = 0;
        this.toggledRows = new Set();
        this.movimentacoes = [];
    }
    Object.defineProperty(ListagemMovimentacaoComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemMovimentacaoComponent.prototype.ngOnInit = function () {
        this.obterMovimentacoes();
        this.configuracao = configuracao_tabela_1["default"]();
        this.colunas = this.obterColunasDaTabela();
        this.linhas = this.data.map(function (_) { return _.codigoMovimentacao; }).reduce(function (acc, cur) { return cur + acc; }, 0);
    };
    ListagemMovimentacaoComponent.prototype.obterDescricaoEnum = function (index) {
        return movimentacao_equipamento_enum_1.MovimentacaoEquipamento[index];
    };
    ListagemMovimentacaoComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemMovimentacaoComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'codigoMovimentacao', title: 'Código' },
                { key: 'nomeFuncionario', title: 'Funcionário' },
                { key: 'nomeUsuario', title: 'Usuário' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemMovimentacaoComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoMovimentacao', title: 'Código', width: '1%' },
            { key: 'dataApropriacao', title: 'Data apro.', width: '15%' },
            { key: 'dataDevolucao', title: 'Data dev.', width: '15%' },
            { key: 'nomeUsuario', title: 'Usuário' },
            { key: 'nomeFuncionario', title: 'Funcionário' },
            { key: '', title: 'Editar' },
        ];
    };
    ListagemMovimentacaoComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemMovimentacaoComponent.prototype.onRowClickEvent = function ($event, index) {
        $event.preventDefault();
        this.table.apiEvent({
            type: ngx_easy_table_1.API.toggleRowIndex,
            value: index
        });
        if (this.toggledRows.has(index)) {
            this.toggledRows["delete"](index);
        }
        else {
            this.toggledRows.add(index);
        }
    };
    ListagemMovimentacaoComponent.prototype.obterMovimentacoes = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (parametro) { _this.codigoPatrimonio = +_this.encriptacao.decrypt(parametro['codigoPatrimonio']); });
        this.spinner.show("buscando");
        this.movimentacaoService.obterTodasMovimentacoesDoPatrimonio(this.codigoPatrimonio).subscribe({
            next: function (movimentacoes) {
                _this.movimentacoes = movimentacoes;
                _this.data = movimentacoes;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao buscar pelas movimenta\u00E7\u00F5es. Mensagem " + template.mensagemErro, 'Erro');
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemMovimentacaoComponent.prototype.detalheMovimentacao = function (codigoMovimentacao) {
        this.router.navigate(["dashboard/movimentacao"], { queryParams: { codigoMovimentacao: codigoMovimentacao } });
    };
    __decorate([
        core_1.ViewChild('table', { static: true })
    ], ListagemMovimentacaoComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemMovimentacaoComponent.prototype, "onResize");
    ListagemMovimentacaoComponent = __decorate([
        core_1.Component({
            selector: 'app-listagem-movimentacao',
            templateUrl: './listagem-movimentacao.component.html',
            styleUrls: ['./listagem-movimentacao.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemMovimentacaoComponent);
    return ListagemMovimentacaoComponent;
}());
exports.ListagemMovimentacaoComponent = ListagemMovimentacaoComponent;
