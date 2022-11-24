"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemPatrimonioComponent = void 0;
var core_1 = require("@angular/core");
var situacao_equipamento_enum_1 = require("@nvs-enum/situacao-equipamento.enum");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemPatrimonioComponent = /** @class */ (function () {
    function ListagemPatrimonioComponent(patrimonioService, modalService, toaster, spinner, router, token, encriptacao, detectorAlteracao) {
        this.patrimonioService = patrimonioService;
        this.modalService = modalService;
        this.toaster = toaster;
        this.spinner = spinner;
        this.router = router;
        this.token = token;
        this.encriptacao = encriptacao;
        this.detectorAlteracao = detectorAlteracao;
        this.data = [];
        this.linhas = 0;
        this.toggledRows = new Set();
        this.dataFiltradaExcel = [];
        this.patrimonios = [];
        this.patrimonioId = 0;
        this.ehAdministrador = false;
    }
    ListagemPatrimonioComponent.prototype.ngOnInit = function () {
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.obterPatrimonios();
        this.configuracao = configuracao_tabela_1["default"]();
        this.linhas = this.data.map(function (_) { return _.codigoPatrimonio; }).reduce(function (acc, cur) { return cur + acc; }, 0);
        this.colunas = this.obterColunasDaTabela();
        this.checkView();
    };
    Object.defineProperty(ListagemPatrimonioComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 1200;
        },
        enumerable: false,
        configurable: true
    });
    ListagemPatrimonioComponent.prototype.abrirModal = function (event, template, patrimonioId) {
        event.stopPropagation();
        this.patrimonioId = patrimonioId;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemPatrimonioComponent.prototype.obterPatrimonios = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.patrimonioService.obterPatrimonios().subscribe({
            next: function (patrimonios) {
                _this.dataFiltradaExcel = patrimonios;
                _this.data = patrimonios;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao buscar pelos patrim\u00F4nios. Mensagem: " + template.mensagemErro, template.titulo);
            },
            complete: function () {
                _this.configuracao.isLoading = false;
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemPatrimonioComponent.prototype.confirmar = function () {
        var _this = this;
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
        this.spinner.show("excluindo");
        this.patrimonioService.excluirPatrimonio(this.patrimonioId).subscribe(function () {
            _this.toaster.success('Patrimônio excluído com sucesso!', 'Excluído');
            _this.obterPatrimonios();
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao excluir o patrim\u00F4nio. Mensagem: " + template.mensagemErro, template.titulo);
        }).add(function () { return _this.spinner.hide("excluindo"); });
    };
    ListagemPatrimonioComponent.prototype.recusar = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    ListagemPatrimonioComponent.prototype.fecharModalPerda = function (podeFechar) {
        var botaoFecharPerda = document.getElementById("botao-fechar-modal-perda");
        botaoFecharPerda.click();
        this.obterPatrimonios();
    };
    ListagemPatrimonioComponent.prototype.detalhePatrimonio = function (codigoPatrimonio, serviceTag) {
        this.router.navigate(["dashboard/patrimonio"], { queryParams: { codigoPatrimonio: codigoPatrimonio, serviceTag: serviceTag } });
    };
    ListagemPatrimonioComponent.prototype.obterDescricaoEnum = function (index) {
        return situacao_equipamento_enum_1.SituacaoEquipamento[index];
    };
    ListagemPatrimonioComponent.prototype.cadastrarMovimentacao = function (codigoPatrimonio, tipoEquipamento, nomeFuncionario) {
        this.router.navigate(["dashboard/movimentacao"], { queryParams: { codigoPatrimonio: this.encriptacao.encrypt(codigoPatrimonio.toString()), nomePatrimonio: tipoEquipamento + " - " + nomeFuncionario } });
    };
    ListagemPatrimonioComponent.prototype.listarTodasAsMovimentacoes = function (codigoPatrimonio) {
        this.router.navigate(["dashboard/movimentacao/listagem"], { queryParams: { codigoPatrimonio: this.encriptacao.encrypt(codigoPatrimonio.toString()) } });
    };
    ListagemPatrimonioComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarPatrimonios(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemPatrimonioComponent.prototype.filtrarPatrimonios = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (patrimonios) {
            return patrimonios.codigoPatrimonio.toString().indexOf(valor) !== -1 ||
                patrimonios.codigoTipoEquipamento.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
                patrimonios.situacaoEquipamento.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
                patrimonios.modelo.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
                patrimonios.nomeFuncionario.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemPatrimonioComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Patrimonios');
            XLSX.writeFile(wb, 'patrimonios.xlsx');
        }
        catch (err) {
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
        }
    };
    ListagemPatrimonioComponent.prototype.atribuirCodigoPatrimonio = function (codigoPatrimonio) {
        this.patrimonioId = codigoPatrimonio;
    };
    ListagemPatrimonioComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoPatrimonio', title: 'Código', width: '3%' },
            { key: 'situacaoEquipamento', title: 'Situação', width: '17%' },
            { key: 'tipoEquipamento', title: 'Equipamento', width: '5%' },
            { key: 'nomeFuncionario', title: 'Funcionário' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Excluir' },
            { key: '', title: 'Ações' },
        ];
    };
    ListagemPatrimonioComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'tipoEquipamento', title: 'Equip.' },
                { key: 'nomeFuncionario', title: 'Func.' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemPatrimonioComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemPatrimonioComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemPatrimonioComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemPatrimonioComponent.prototype, "onResize");
    ListagemPatrimonioComponent = __decorate([
        core_1.Component({
            selector: 'app-listarPatrimonio',
            templateUrl: './listagem-patrimonio.component.html',
            styleUrls: ['./listagem-patrimonio.component.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemPatrimonioComponent);
    return ListagemPatrimonioComponent;
}());
exports.ListagemPatrimonioComponent = ListagemPatrimonioComponent;
