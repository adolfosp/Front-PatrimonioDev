"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemPermissaoComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemPermissaoComponent = /** @class */ (function () {
    function ListagemPermissaoComponent(permissaoService, modalService, toaster, spinner, router, token, detectorAlteracao) {
        this.permissaoService = permissaoService;
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
        this.permissaoId = 0;
        this.ehAdministrador = false;
    }
    ListagemPermissaoComponent.prototype.ngOnInit = function () {
        this.obterPermissoes();
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.configuracao = configuracao_tabela_1["default"]();
        this.linhas = this.data.map(function (_) { return _.codigoPerfil; }).reduce(function (acc, cur) { return cur + acc; }, 0);
        this.colunas = this.obterColunasDaTabela();
        this.checkView();
    };
    Object.defineProperty(ListagemPermissaoComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemPermissaoComponent.prototype.abrirModal = function (event, template, permissaoId) {
        event.stopPropagation();
        this.permissaoId = permissaoId;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemPermissaoComponent.prototype.obterPermissoes = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.permissaoService.obterPermissoes().subscribe({
            next: function (permissoes) {
                _this.data = permissoes;
                _this.dataFiltradaExcel = permissoes;
            },
            // eslint-disable-next-line rxjs/no-implicit-any-catch
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao carregar as permiss\u00F5es. Mensagem " + template.mensagemErro, template.titulo);
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemPermissaoComponent.prototype.confirmar = function () {
        var _this = this;
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
        this.spinner.show("desativando");
        debugger;
        this.permissaoService.desativarPermissao(this.permissaoId).subscribe(function () {
            _this.toaster.success('Permissão desativada com sucesso!', 'Desativar');
            _this.obterPermissoes();
        }, 
        // eslint-disable-next-line rxjs/no-implicit-any-catch
        function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao desativar a permiss\u00E3o. Mensagem " + template.mensagemErro, template.titulo);
        }).add(function () { return _this.spinner.hide("desativando"); });
    };
    ListagemPermissaoComponent.prototype.recusar = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    ListagemPermissaoComponent.prototype.detalhePermissao = function (codigoPermissao) {
        this.router.navigate(["dashboard/permissao/" + codigoPermissao]);
    };
    ListagemPermissaoComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarPermissoes(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemPermissaoComponent.prototype.filtrarPermissoes = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (permissao) {
            return permissao.codigoPerfil.toString().indexOf(valor) !== -1 ||
                permissao.descricaoPerfil.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemPermissaoComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Permissoes');
            XLSX.writeFile(wb, 'permissoes.xlsx');
        }
        catch (err) {
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
        }
    };
    ListagemPermissaoComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoPerfil', title: 'Código' },
            { key: 'descricaoPerfil', title: 'Nome' },
            { key: 'ativo', title: 'Situação' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Desativar' },
        ];
    };
    ListagemPermissaoComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'descricaoPerfil', title: 'Nome' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemPermissaoComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemPermissaoComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemPermissaoComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemPermissaoComponent.prototype, "onResize");
    ListagemPermissaoComponent = __decorate([
        core_1.Component({
            selector: 'app-listarPermissao',
            templateUrl: './listagem-permissao.component.html',
            styleUrls: ['./listagem-permissao.component.sass',],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemPermissaoComponent);
    return ListagemPermissaoComponent;
}());
exports.ListagemPermissaoComponent = ListagemPermissaoComponent;
