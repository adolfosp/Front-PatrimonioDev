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
exports.ListagemCategoriaComponent = void 0;
var core_1 = require("@angular/core");
var Componente_1 = require("@nvs-models/Componente");
var configuracao_tabela_1 = require("@nvs-utils/configuracao-tabela");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var ListagemCategoriaComponent = /** @class */ (function (_super) {
    __extends(ListagemCategoriaComponent, _super);
    function ListagemCategoriaComponent(categoriaService, spinner, modalService, toaster, router, token, detectorAlteracao) {
        var _this = _super.call(this, toaster) || this;
        _this.categoriaService = categoriaService;
        _this.spinner = spinner;
        _this.modalService = modalService;
        _this.toaster = toaster;
        _this.router = router;
        _this.token = token;
        _this.detectorAlteracao = detectorAlteracao;
        _this.data = [];
        _this.categorias = [];
        _this.ehAdministrador = false;
        _this.dataFiltradaExcel = [];
        _this.linhas = 0;
        _this.toggledRows = new Set();
        return _this;
    }
    ListagemCategoriaComponent.prototype.ngOnInit = function () {
        this.configuracao = configuracao_tabela_1["default"]();
        this.colunas = this.obterColunasDaTabela();
        this.obterCategorias();
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.checkView();
    };
    Object.defineProperty(ListagemCategoriaComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemCategoriaComponent.prototype.obterCategorias = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.categoriaService.obterTodasCategorias().subscribe({
            next: function (dados) {
                _this.data = dados.data;
                _this.dataFiltradaExcel = dados.data;
            },
            error: function (error) {
                _this.mostrarAvisoErro(error, "Houve um erro ao buscar pelas categorias");
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemCategoriaComponent.prototype.abrirModal = function (event, template, codigoCategoria) {
        event.stopPropagation();
        this.codigoCategoria = codigoCategoria;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemCategoriaComponent.prototype.confirmar = function () {
        var _this = this;
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
        this.spinner.show("excluindo");
        this.categoriaService.deletarCategoria(this.codigoCategoria).subscribe({
            next: function () {
                _this.mostrarAvisoSucesso("Categoria removida com sucesso!");
                _this.obterCategorias();
            },
            error: function (error) {
                _this.mostrarAvisoErro(error, "Houve um erro ao excluir a categoria");
            }
        }).add(function () { return _this.spinner.hide("excluindo"); });
    };
    ListagemCategoriaComponent.prototype.recusar = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    ListagemCategoriaComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarFabricantes(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemCategoriaComponent.prototype.filtrarFabricantes = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (categoria) {
            return categoria.codigoCategoria.toString().indexOf(valor) !== -1 ||
                categoria.descricao.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemCategoriaComponent.prototype.detalheCategoria = function (codigoCategoria) {
        this.router.navigate(["dashboard/categoria/" + codigoCategoria]);
    };
    ListagemCategoriaComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'categorias');
            XLSX.writeFile(wb, 'categorias.xlsx');
        }
        catch (err) {
            this.mostrarAvisoXLS("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err);
        }
    };
    ListagemCategoriaComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoCategoria', title: 'Código', width: '3%' },
            { key: 'descricao', title: 'Descrição' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Excluir' },
        ];
    };
    ListagemCategoriaComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'descricao', title: 'Descrição' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemCategoriaComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemCategoriaComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemCategoriaComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemCategoriaComponent.prototype, "onResize");
    ListagemCategoriaComponent = __decorate([
        core_1.Component({
            selector: 'app-listagem-categoria',
            templateUrl: './listagem-categoria.component.html',
            styleUrls: ['./listagem-categoria.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemCategoriaComponent);
    return ListagemCategoriaComponent;
}(Componente_1["default"]));
exports.ListagemCategoriaComponent = ListagemCategoriaComponent;
