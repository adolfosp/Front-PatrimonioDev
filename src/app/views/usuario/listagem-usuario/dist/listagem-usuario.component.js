"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListagemUsuarioComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var ngx_easy_table_1 = require("ngx-easy-table");
var XLSX = require("xlsx");
var configuracao_tabela_1 = require("../../../utils/configuracao-tabela");
var ListagemUsuarioComponent = /** @class */ (function () {
    function ListagemUsuarioComponent(toaster, usuarioService, spinner, modalService, router, detectorAlteracao, token) {
        this.toaster = toaster;
        this.usuarioService = usuarioService;
        this.spinner = spinner;
        this.modalService = modalService;
        this.router = router;
        this.detectorAlteracao = detectorAlteracao;
        this.token = token;
        this.linhas = 0;
        this.toggledRows = new Set();
        this.data = [];
        this.dataFiltradaExcel = [];
    }
    ListagemUsuarioComponent.prototype.ngOnInit = function () {
        this.obterUsuario();
        this.configuracao = configuracao_tabela_1["default"]();
        this.linhas = this.data.map(function (_) { return _.codigoSetor; }).reduce(function (acc, cur) { return cur + acc; }, 0);
        this.ehAdministrador = this.token.ehUsuarioAdministrador();
        this.colunas = this.obterColunasDaTabela();
        this.checkView();
    };
    ListagemUsuarioComponent.prototype.checkView = function () {
        this.innerWidth = window.innerWidth;
        if (this.isMobile) {
            this.colunas = [
                { key: 'nome', title: 'Nome' },
                { key: '', title: 'Expandir' },
            ];
        }
        else {
            this.colunas = this.obterColunasDaTabela();
        }
    };
    ListagemUsuarioComponent.prototype.obterColunasDaTabela = function () {
        return [
            { key: 'codigoUsuario', title: 'Código', width: '3%' },
            { key: 'nome', title: 'Nome' },
            { key: 'email', title: 'E-mail' },
            { key: '', title: 'Editar' },
            { key: '', title: 'Desativar' },
        ];
    };
    Object.defineProperty(ListagemUsuarioComponent.prototype, "isMobile", {
        get: function () {
            return this.innerWidth <= 768;
        },
        enumerable: false,
        configurable: true
    });
    ListagemUsuarioComponent.prototype.obterUsuario = function () {
        var _this = this;
        this.spinner.show("buscando");
        this.usuarioService.obterTodosUsuarios().subscribe({
            next: function (usuarios) {
                _this.data = usuarios;
                _this.dataFiltradaExcel = usuarios;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao buscar pelos usu\u00E1rios. Mensagem: " + template.mensagemErro, template.titulo);
            },
            complete: function () {
                _this.detectorAlteracao.markForCheck();
            }
        }).add(function () { return _this.spinner.hide("buscando"); });
    };
    ListagemUsuarioComponent.prototype.exportarParaExcel = function () {
        try {
            var ws = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
            XLSX.writeFile(wb, 'usuarios.xlsx');
        }
        catch (err) {
            this.toaster.error("N\u00E3o foi poss\u00EDvel exportar a planilha. Mensagem: " + err, "Erro");
        }
    };
    ListagemUsuarioComponent.prototype.onChange = function (event) {
        var valorDigitado = event.target.value;
        this.filtrarUsuarios(valorDigitado);
        this.table.apiEvent({
            type: ngx_easy_table_1.API.onGlobalSearch,
            value: valorDigitado
        });
    };
    ListagemUsuarioComponent.prototype.filtrarUsuarios = function (valor) {
        this.dataFiltradaExcel = this.data.filter(function (usuario) {
            return usuario.codigoUsuario.toString().indexOf(valor) !== -1 ||
                usuario.email.toLocaleLowerCase().indexOf(valor) !== -1 ||
                usuario.nome.toLocaleLowerCase().indexOf(valor) !== -1;
        });
    };
    ListagemUsuarioComponent.prototype.confirmar = function () {
        var _this = this;
        this.modalRef.hide();
        this.spinner.show("desativando");
        this.usuarioService.desativarUsuario(this.codigoUsuario).subscribe(function () {
            _this.toaster.success('Usuário desativado com sucesso!', 'Desativado');
            _this.obterUsuario();
        }, function (error) {
            var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            _this.toaster[template.tipoMensagem]("Houve um erro ao desativar o usu\u00E1rio. Mensagem: " + template.mensagemErro, template.titulo);
        }).add(function () { return _this.spinner.hide("desativando"); });
    };
    ListagemUsuarioComponent.prototype.abrirModal = function (event, template, codigoUsuario) {
        event.stopPropagation();
        this.codigoUsuario = codigoUsuario;
        this.modalRef = this.modalService.show(template, { "class": 'modal-sm' });
    };
    ListagemUsuarioComponent.prototype.recusar = function () {
        this.modalRef.hide();
    };
    ListagemUsuarioComponent.prototype.detalheUsuario = function (codigoUsuario) {
        this.router.navigate(["dashboard/usuario/" + codigoUsuario]);
    };
    ListagemUsuarioComponent.prototype.onResize = function () {
        this.checkView();
    };
    ListagemUsuarioComponent.prototype.onRowClickEvent = function ($event, index) {
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
    ], ListagemUsuarioComponent.prototype, "table");
    __decorate([
        core_1.HostListener('window:resize', [])
    ], ListagemUsuarioComponent.prototype, "onResize");
    ListagemUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-listagem-usuario',
            templateUrl: './listagem-usuario.component.html',
            styleUrls: ['./listagem-usuario.component.sass', '../../../../assets/style-listagem.sass'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ListagemUsuarioComponent);
    return ListagemUsuarioComponent;
}());
exports.ListagemUsuarioComponent = ListagemUsuarioComponent;
