"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemEquipamentoComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemEquipamentoComponent = /** @class */ (function () {
    function ListagemEquipamentoComponent(equipamentoService, modalService, toaster, spinner, router, token, detectorAlteracao) {
        this.equipamentoService = equipamentoService;
        this.modalService = modalService;
        this.toaster = toaster;
        this.spinner = spinner;
        this.router = router;
        this.token = token;
        this.detectorAlteracao = detectorAlteracao;
        this.linhas = 0;
        this.toggledRows = new Set();
        this.data = [];
        this.dataFiltradaExcel = [];
        this.equipamentoId = 0;
        this.ehAdministrador = false;
    }
    ListagemEquipamentoComponent.prototype.ngOnInit = function () {
        this.obterEquipamentos();
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.configuracao = configuracao_tabela_1["default"]();
        this.linhas = this.data.map(function (_) { return _.codigoTipoEquipamento; }).reduce(function (acc, cur) { return cur + acc; }, 0);
        this.colunas = this.obterColunasDaTabela();
        this.checkView();
    };
    Object.defineProperty(ListagemEquipamentoComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemEquipamentoComponent.prototype.abrirModal = function (event, template, equipamentoId) {
        event.stopPropagation();
        this.equipamentoId = equipamentoId;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemEquipamentoComponent.prototype.obterEquipamentos = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.equipamentoService.obterTodosEquipamentos().subscribe({
            next: function (equipamento) {
                _this.data = equipamento;
                _this.dataFiltradaExcel = equipamento;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao carregar os equipamentos. Mensagem " + template.mensagemErro, template.titulo);
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemEquipamentoComponent.prototype.confirmar = function () {
        var _this = this;
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
        this.spinner.show("excluindo");
        debugger;
        this.equipamentoService.deletarEquipamento(this.equipamentoId).subscribe(function () {
            _this.toaster.success('Equipamento excluído com sucesso!', 'Exclusão');
            _this.obterEquipamentos();
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao excluir o equipamento. Mensagem " + template.mensagemErro, template.titulo);
        }).add(function () { return _this.spinner.hide("excluindo"); });
    };
    ListagemEquipamentoComponent.prototype.recusar = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    ListagemEquipamentoComponent.prototype.detalheEquipamento = function (codigoEquipamento) {
        this.router.navigate(["dashboard/equipamento/" + codigoEquipamento]);
    };
    ListagemEquipamentoComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarEquipamentos(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemEquipamentoComponent.prototype.filtrarEquipamentos = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (equipamento) {
            return equipamento.codigoTipoEquipamento.toString().indexOf(valor) !== -1 ||
                equipamento.tipoEquipamento.toLocaleLowerCase().indexOf(valor) !== -1 ||
                equipamento.nomeFabricante.toLocaleLowerCase().indexOf(valor) !== -1 ||
                equipamento.nomeCategoria.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemEquipamentoComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Equipamentos');
            XLSX.writeFile(wb, 'equipamentos.xlsx');
        }
        catch (err) {
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
        }
    };
    ListagemEquipamentoComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoTipoEquipamento', title: 'Código' },
            { key: 'tipoEquipamento', title: 'Descrição' },
            { key: 'nomeFabricante', title: 'Fabricante' },
            { key: 'nomeFabricante', title: 'Categoria' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Excluir' },
        ];
    };
    ListagemEquipamentoComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'tipoEquipamento', title: 'Descrição' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemEquipamentoComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemEquipamentoComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemEquipamentoComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemEquipamentoComponent.prototype, "onResize");
    ListagemEquipamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-listarEquipamento',
            templateUrl: './listagem-equipamento.component.html',
            styleUrls: ['./listagem-equipamento.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemEquipamentoComponent);
    return ListagemEquipamentoComponent;
}());
exports.ListagemEquipamentoComponent = ListagemEquipamentoComponent;
