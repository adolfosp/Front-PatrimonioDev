"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemFabricanteComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemFabricanteComponent = /** @class */ (function () {
    function ListagemFabricanteComponent(fabricanteService, spinner, modalService, toaster, router, token, detectorAlteracao) {
        this.fabricanteService = fabricanteService;
        this.spinner = spinner;
        this.modalService = modalService;
        this.toaster = toaster;
        this.router = router;
        this.token = token;
        this.detectorAlteracao = detectorAlteracao;
        this.data = [];
        this.fabricantes = [];
        this.ehAdministrador = false;
        this.dataFiltradaExcel = [];
        this.linhas = 0;
        this.toggledRows = new Set();
    }
    ListagemFabricanteComponent.prototype.ngOnInit = function () {
        this.configuracao = configuracao_tabela_1["default"]();
        this.colunas = this.obterColunasDaTabela();
        this.obterFabricante();
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.checkView();
    };
    Object.defineProperty(ListagemFabricanteComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemFabricanteComponent.prototype.obterFabricante = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.fabricanteService.obterTodosFabricante().subscribe({
            next: function (fabricantes) {
                _this.data = fabricantes;
                _this.dataFiltradaExcel = fabricantes;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao buscar pelos fabricantes. Mensagem " + template.mensagemErro, template.titulo);
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemFabricanteComponent.prototype.abrirModal = function (event, template, codigoFabricante) {
        event.stopPropagation();
        this.codigoFabricante = codigoFabricante;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemFabricanteComponent.prototype.confirmar = function () {
        var _this = this;
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
        this.spinner.show("excluindo");
        this.fabricanteService.deletarFabricante(this.codigoFabricante).subscribe(function () {
            _this.toaster.success('Fabricante removido com sucesso!', 'Excluindo');
            _this.obterFabricante();
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao excluir o fabricante. Mensagem " + template.mensagemErro, template.titulo);
        }).add(function () { return _this.spinner.hide("excluindo"); });
    };
    ListagemFabricanteComponent.prototype.recusar = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    ListagemFabricanteComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarFabricantes(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemFabricanteComponent.prototype.filtrarFabricantes = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (fabricante) {
            return fabricante.codigoFabricante.toString().indexOf(valor) !== -1 ||
                fabricante.nomeFabricante.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemFabricanteComponent.prototype.detalheFabricante = function (codigoFabricante) {
        this.router.navigate(["dashboard/fabricante/" + codigoFabricante]);
    };
    ListagemFabricanteComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'fabricantes');
            XLSX.writeFile(wb, 'fabricantes.xlsx');
        }
        catch (err) {
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
        }
    };
    ListagemFabricanteComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoFabricante', title: 'Código' },
            { key: 'nomeFabricante', title: 'Nome' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Excluir' },
        ];
    };
    ListagemFabricanteComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'codigoFabricante', title: 'Código' },
                { key: 'nomeFabricante', title: 'Nome' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemFabricanteComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemFabricanteComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemFabricanteComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemFabricanteComponent.prototype, "onResize");
    ListagemFabricanteComponent = __decorate([
        core_1.Component({
            selector: 'app-listarFabricante',
            templateUrl: './listagem-fabricante.component.html',
            styleUrls: ['./listagem-fabricante.component.sass', '../../../../assets/style-listagem.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemFabricanteComponent);
    return ListagemFabricanteComponent;
}());
exports.ListagemFabricanteComponent = ListagemFabricanteComponent;
