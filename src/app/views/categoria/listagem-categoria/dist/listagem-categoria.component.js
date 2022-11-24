"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemCategoriaComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemCategoriaComponent = /** @class */ (function () {
    function ListagemCategoriaComponent(categoriaService, spinner, modalService, toaster, router, token, detectorAlteracao) {
        this.categoriaService = categoriaService;
        this.spinner = spinner;
        this.modalService = modalService;
        this.toaster = toaster;
        this.router = router;
        this.token = token;
        this.detectorAlteracao = detectorAlteracao;
        this.data = [];
        this.categorias = [];
        this.ehAdministrador = false;
        this.dataFiltradaExcel = [];
        this.linhas = 0;
        this.toggledRows = new Set();
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
            next: function (categorias) {
                _this.data = categorias;
                _this.dataFiltradaExcel = categorias;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao buscar pelas categorias. Mensagem " + template.mensagemErro, template.titulo);
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
        this.categoriaService.deletarCategoria(this.codigoCategoria).subscribe(function () {
            _this.toaster.success('Categoria removida com sucesso!', 'Excluindo');
            _this.obterCategorias();
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao excluir a categoria. Mensagem " + template.mensagemErro, template.titulo);
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
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
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
}());
exports.ListagemCategoriaComponent = ListagemCategoriaComponent;
