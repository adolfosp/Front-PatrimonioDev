"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstatisticaService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var EstatisticaService = /** @class */ (function () {
    function EstatisticaService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "estatisticas";
    }
    EstatisticaService.prototype.obterEstatisticasCategoria = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    EstatisticaService.prototype.obterMediaEquipamentoPorFuncionario = function () {
        return this.api.get(this.baseUrl + "/media").pipe(operators_1.take(1));
    };
    EstatisticaService.prototype.obterPatrimonioDisponivel = function () {
        return this.api.get(this.baseUrl + "/patrimonio-disponivel").pipe(operators_1.take(1));
    };
    EstatisticaService.prototype.obterQuantidadeMovimentacoes = function () {
        return this.api.get(this.baseUrl + "/quantidade-movimentacao").pipe(operators_1.take(1));
    };
    EstatisticaService.prototype.obterEstatisticas = function () {
        var estatisticaCategoria = this.obterEstatisticasCategoria();
        var mediaEquipamento = this.obterMediaEquipamentoPorFuncionario();
        var patrimoniosDisponiveis = this.obterPatrimonioDisponivel();
        var quantidadeMovimentacoes = this.obterQuantidadeMovimentacoes();
        return rxjs_1.forkJoin([estatisticaCategoria, mediaEquipamento, patrimoniosDisponiveis, quantidadeMovimentacoes]);
    };
    EstatisticaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EstatisticaService);
    return EstatisticaService;
}());
exports.EstatisticaService = EstatisticaService;
