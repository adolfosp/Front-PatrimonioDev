"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RelatorioPerdaComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var RelatorioPerdaComponent = /** @class */ (function () {
    function RelatorioPerdaComponent(toaster, token, spinner, perdaService, detectorAlteracao) {
        this.toaster = toaster;
        this.token = token;
        this.spinner = spinner;
        this.perdaService = perdaService;
        this.detectorAlteracao = detectorAlteracao;
        this.data = [];
        this.linhas = 0;
        this.toggledRows = new Set();
        this.dataFiltradaExcel = [];
        this.funcionarios = [];
        this.ehAdministrador = false;
    }
    RelatorioPerdaComponent.prototype.ngOnInit = function () {
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.obterPerdas();
        this.configuracao = configuracao_tabela_1["default"]();
        this.linhas = this.data.map(function (_) { return _.codigoPerda; }).reduce(function (acc, cur) { return cur + acc; }, 0);
        this.colunas = this.obterColunasDaTabela();
    };
    Object.defineProperty(RelatorioPerdaComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    RelatorioPerdaComponent.prototype.obterPerdas = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.perdaService.obterPerdas().subscribe({
            next: function (perdas) {
                _this.dataFiltradaExcel = perdas;
                _this.data = perdas;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao buscar pelas perdas. Mensagem " + template.mensagemErro, template.titulo);
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    RelatorioPerdaComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarPerdas(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    RelatorioPerdaComponent.prototype.filtrarPerdas = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (perdas) {
            return perdas.motivoDaPerda.toString().indexOf(valor) !== -1 ||
                perdas.codigoPerda.toString().indexOf(valor) !== -1 ||
                perdas.nomeFuncionario.toString().indexOf(valor) !== -1 ||
                perdas.nomeUsuario.toString().indexOf(valor) !== -1;
        });
    };
    RelatorioPerdaComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Perdas');
            XLSX.writeFile(wb, 'perdas.xlsx');
        }
        catch (err) {
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
        }
    };
    RelatorioPerdaComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'motivoDaPerda', title: 'Perda' },
        ];
    };
    RelatorioPerdaComponent.prototype.onRowClickEvent = function ($event, index) {
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
    __decorate([
        core_1.ViewChild('table', { static: true })
    ], RelatorioPerdaComponent.prototype, "table");
    RelatorioPerdaComponent = __decorate([
        core_1.Component({
            selector: 'app-relatorio-perda',
            templateUrl: './relatorio-perda.component.html',
            styleUrls: ['./relatorio-perda.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], RelatorioPerdaComponent);
    return RelatorioPerdaComponent;
}());
exports.RelatorioPerdaComponent = RelatorioPerdaComponent;
