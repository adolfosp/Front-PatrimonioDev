"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemFuncionarioComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemFuncionarioComponent = /** @class */ (function () {
    function ListagemFuncionarioComponent(funcionarioService, modalService, toaster, spinner, router, token, detectorAlteracao) {
        this.funcionarioService = funcionarioService;
        this.modalService = modalService;
        this.toaster = toaster;
        this.spinner = spinner;
        this.router = router;
        this.token = token;
        this.detectorAlteracao = detectorAlteracao;
        this.data = [];
        this.linhas = 0;
        this.toggledRows = new Set();
        this.dataFiltradaExcel = [];
        this.funcionarios = [];
        this.funcionarioId = 0;
        this.ehAdministrador = false;
    }
    ListagemFuncionarioComponent.prototype.ngOnInit = function () {
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.obterFuncionarios();
        this.configuracao = configuracao_tabela_1["default"]();
        this.linhas = this.data.map(function (_) { return _.codigoFuncionario; }).reduce(function (acc, cur) { return cur + acc; }, 0);
        this.colunas = this.obterColunasDaTabela();
        this.checkView();
    };
    Object.defineProperty(ListagemFuncionarioComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemFuncionarioComponent.prototype.abrirModal = function (event, template, funcionarioId) {
        event.stopPropagation();
        this.funcionarioId = funcionarioId;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemFuncionarioComponent.prototype.obterFuncionarios = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.funcionarioService.obterTodosFuncionarios().subscribe({
            next: function (funcionarios) {
                _this.dataFiltradaExcel = funcionarios;
                _this.data = funcionarios;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao buscar pelos funcion\u00E1rios. Mensagem " + template.mensagemErro, template.titulo);
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemFuncionarioComponent.prototype.confirmar = function () {
        var _this = this;
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
        this.spinner.show("desativando");
        debugger;
        this.funcionarioService.desativarFuncionario(this.funcionarioId).subscribe(function () {
            _this.toaster.success('Funcionário desativado com sucesso!', 'Deletado');
            _this.obterFuncionarios();
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao desativar o funcion\u00E1rio. Mensagem: " + template.mensagemErro, template.titulo);
        }).add(function () { return _this.spinner.hide("desativando"); });
    };
    ListagemFuncionarioComponent.prototype.recusar = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    ListagemFuncionarioComponent.prototype.detalheFuncionario = function (codigoFuncionario) {
        this.router.navigate(["dashboard/funcionario/" + codigoFuncionario]);
    };
    ListagemFuncionarioComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarFuncionarios(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemFuncionarioComponent.prototype.filtrarFuncionarios = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (funcionarios) {
            return funcionarios.codigoFuncionario.toString().indexOf(valor) !== -1 ||
                funcionarios.nomeFuncionario.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemFuncionarioComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Funcionarios');
            XLSX.writeFile(wb, 'funcionarios.xlsx');
        }
        catch (err) {
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
        }
    };
    ListagemFuncionarioComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoFuncionario', title: 'Código', width: '3%' },
            { key: 'nomeFuncionario', title: 'Nome' },
            { key: 'ativo', title: 'Ativo' },
            { key: 'observacao', title: 'Observação' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Desativar' },
        ];
    };
    ListagemFuncionarioComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'codigoFuncionario', title: 'Código' },
                { key: 'nomeFuncionario', title: 'Nome' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemFuncionarioComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemFuncionarioComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemFuncionarioComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemFuncionarioComponent.prototype, "onResize");
    ListagemFuncionarioComponent = __decorate([
        core_1.Component({
            selector: 'app-listagem-funcionario',
            templateUrl: './listagem-funcionario.component.html',
            styleUrls: ['./listagem-funcionario.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemFuncionarioComponent);
    return ListagemFuncionarioComponent;
}());
exports.ListagemFuncionarioComponent = ListagemFuncionarioComponent;
