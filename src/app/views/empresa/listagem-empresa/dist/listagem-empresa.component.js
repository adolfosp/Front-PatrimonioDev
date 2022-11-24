"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemEmpresaComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemEmpresaComponent = /** @class */ (function () {
    function ListagemEmpresaComponent(empresaService, modalService, toaster, spinner, router, token, detectorAlteracao) {
        this.empresaService = empresaService;
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
        this.empresaId = 0;
        this.ehAdministrador = false;
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
            next: function (empresa) {
                _this.data = empresa;
                _this.dataFiltradaExcel = empresa;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao carregar as empresas. Mensagem " + template.mensagemErro, template.titulo);
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
        debugger;
        this.empresaService.deletarEmpresa(this.empresaId).subscribe(function () {
            _this.toaster.success('Empresa excluída com sucesso!', 'Exclusão');
            _this.obterEmpresas();
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao excluir a empresa. Mensagem " + template.mensagemErro, template.titulo);
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
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
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
}());
exports.ListagemEmpresaComponent = ListagemEmpresaComponent;
