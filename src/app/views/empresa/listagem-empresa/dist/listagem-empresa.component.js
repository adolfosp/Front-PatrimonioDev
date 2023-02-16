"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemEmpresaComponent = void 0;
var core_1 = require("@angular/core");
var Componente_1 = require("@nvs-models/Componente");
var configuracao_tabela_1 = require("@nvs-utils/configuracao-tabela");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var ListagemEmpresaComponent = /** @class */ (function (_super) {
    __extends(ListagemEmpresaComponent, _super);
    function ListagemEmpresaComponent(empresaService, modalService, toaster, spinner, router, token, detectorAlteracao) {
        var _this = _super.call(this, toaster) || this;
        _this.empresaService = empresaService;
        _this.modalService = modalService;
        _this.toaster = toaster;
        _this.spinner = spinner;
        _this.router = router;
        _this.token = token;
        _this.detectorAlteracao = detectorAlteracao;
        _this.linhas = 0;
        _this.toggledRows = new Set();
        _this.data = [];
        _this.dataFiltradaExcel = [];
        _this.empresaId = 0;
        _this.ehAdministrador = false;
        return _this;
    }
    ListagemEmpresaComponent.prototype.ngOnInit = function () {
        this.obterEmpresas();
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.configuracao = configuracao_tabela_1["default"]();
        this.linhas = this.data.map(function (_) { return _.codigoEmpresa; }).reduce(function (acc, cur) { return cur + acc; }, 0);
        this.colunas = this.obterColunasDaTabela();
        this.checkView();
    };
    Object.defineProperty(ListagemEmpresaComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemEmpresaComponent.prototype.abrirModal = function (event, template, empresaId) {
        event.stopPropagation();
        this.empresaId = empresaId;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemEmpresaComponent.prototype.obterEmpresas = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.empresaService.obterEmpresas().subscribe({
            next: function (dados) {
                _this.data = dados.data;
                _this.dataFiltradaExcel = dados.data;
            },
            error: function (error) {
                _this.mostrarAvisoErro(error, "Houve um erro ao carregar as empresas");
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemEmpresaComponent.prototype.confirmar = function () {
        var _this = this;
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
        this.spinner.show("excluindo");
        this.empresaService.deletarEmpresa(this.empresaId).subscribe({
            next: function () {
                _this.mostrarAvisoSucesso("Empresa excluída com sucesso!");
                _this.obterEmpresas();
            },
            error: function (error) {
                _this.mostrarAvisoErro(error, "Houve um erro ao excluir a empresa");
            }
        }).add(function () { return _this.spinner.hide("excluindo"); });
    };
    ListagemEmpresaComponent.prototype.recusar = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    ListagemEmpresaComponent.prototype.detalheEmpresa = function (codigoEmpresa) {
        this.router.navigate(["dashboard/empresa/" + codigoEmpresa]);
    };
    ListagemEmpresaComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarEmpresas(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemEmpresaComponent.prototype.filtrarEmpresas = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (empresa) {
            return empresa.codigoEmpresa.toString().indexOf(valor) !== -1 ||
                empresa.razaoSocial.toLocaleLowerCase().indexOf(valor) !== -1 ||
                empresa.nomeFantasia.toLocaleLowerCase().indexOf(valor) !== -1 ||
                empresa.cnpj.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemEmpresaComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Empresas');
            XLSX.writeFile(wb, 'empresas.xlsx');
        }
        catch (err) {
            this.mostrarAvisoXLS("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err);
        }
    };
    ListagemEmpresaComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoEmpresa', title: 'Código', width: '3%' },
            { key: 'razaoSocial', title: 'Razão Social' },
            { key: 'nomeFantasia', title: 'Nome Fantasia' },
            { key: 'empresaoPadraoImpressao', title: 'Empresa Impressão' },
            { key: 'cnpj', title: 'CNPJ' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Excluir' },
        ];
    };
    ListagemEmpresaComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'razaoSocial', title: 'Razão Social' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemEmpresaComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemEmpresaComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemEmpresaComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemEmpresaComponent.prototype, "onResize");
    ListagemEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'app-listarempresa',
            templateUrl: './listagem-empresa.component.html',
            styleUrls: ['./listagem-empresa.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemEmpresaComponent);
    return ListagemEmpresaComponent;
}(Componente_1["default"]));
exports.ListagemEmpresaComponent = ListagemEmpresaComponent;
