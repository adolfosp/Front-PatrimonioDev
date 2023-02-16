"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemSetorComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemSetorComponent = /** @class */ (function () {
    function ListagemSetorComponent(setorService, modalService, toaster, spinner, router, token, detectorAlteracao) {
        this.setorService = setorService;
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
        this.setores = [];
        this.setorId = 0;
        this.ehAdministrador = false;
    }
    ListagemSetorComponent.prototype.ngOnInit = function () {
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.obterSetores();
        this.configuracao = configuracao_tabela_1["default"]();
        this.linhas = this.data.map(function (_) { return _.codigoSetor; }).reduce(function (acc, cur) { return cur + acc; }, 0);
        this.colunas = this.obterColunasDaTabela();
        this.checkView();
    };
    Object.defineProperty(ListagemSetorComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemSetorComponent.prototype.abrirModal = function (event, template, setorId) {
        event.stopPropagation();
        this.setorId = setorId;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemSetorComponent.prototype.obterSetores = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.setorService.obterSetor().subscribe({
            next: function (dados) {
                _this.dataFiltradaExcel = dados.data;
                _this.data = dados.data;
            },
            error: function (error) {
                if (error["status"] == 403) {
                    _this.toaster.info("Voc\u00EA n\u00E3o tem acesso para realizar essa a\u00E7\u00E3o!", 'Informação');
                }
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao buscar pelo setores. Mensagem " + template.mensagemErro, 'Erro');
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemSetorComponent.prototype.confirmar = function () {
        var _this = this;
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
        this.spinner.show("excluindo");
        this.setorService.deletarSetor(this.setorId).subscribe(function () {
            _this.toaster.success('Setor removido com sucesso!', 'Deletado');
            _this.obterSetores();
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao remover o setor. Mensagem: " + template.mensagemErro, 'Erro');
        }).add(function () { return _this.spinner.hide("excluindo"); });
    };
    ListagemSetorComponent.prototype.recusar = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    ListagemSetorComponent.prototype.detalheSetor = function (codigoSetor) {
        this.router.navigate(["dashboard/setor/" + codigoSetor]);
    };
    ListagemSetorComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarSetores(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemSetorComponent.prototype.filtrarSetores = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (setor) {
            return setor.codigoSetor.toString().indexOf(valor) !== -1 ||
                setor.nome.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemSetorComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Setores');
            XLSX.writeFile(wb, 'setores.xlsx');
        }
        catch (err) {
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
        }
    };
    ListagemSetorComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoSetor', title: 'Código' },
            { key: 'nome', title: 'Nome' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Excluir' },
        ];
    };
    ListagemSetorComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'codigoSetor', title: 'Código' },
                { key: 'nome', title: 'Nome' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemSetorComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemSetorComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemSetorComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemSetorComponent.prototype, "onResize");
    ListagemSetorComponent = __decorate([
        core_1.Component({
            selector: 'app-listagem-setor',
            templateUrl: './listagem-setor.component.html',
            styleUrls: ['./listagem-setor.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemSetorComponent);
    return ListagemSetorComponent;
}());
exports.ListagemSetorComponent = ListagemSetorComponent;
