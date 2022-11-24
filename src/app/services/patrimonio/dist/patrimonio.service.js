"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PatrimonioService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var PatrimonioService = /** @class */ (function () {
    function PatrimonioService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "patrimonios";
    }
    PatrimonioService.prototype.obterPatrimonios = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    PatrimonioService.prototype.cadastrarPatrimonio = function (patrimonio, informacaoAdicional) {
        return this.api
            .post(this.baseUrl, { patrimonio: patrimonio, informacaoAdicional: informacaoAdicional })
            .pipe(operators_1.take(1));
    };
    PatrimonioService.prototype.excluirPatrimonio = function (patrimonioId) {
        return this.api["delete"](this.baseUrl + "/" + patrimonioId)
            .pipe(operators_1.take(1));
    };
    PatrimonioService.prototype.obterApenasUmPatrimonio = function (patrimonioId) {
        return this.api
            .get(this.baseUrl + "/" + patrimonioId)
            .pipe(operators_1.take(1));
    };
    PatrimonioService.prototype.obterInformacaoAdicional = function (codigoPatrimonio) {
        return this.api.get(environment_1.environment.apiUrl + "informacoes/" + codigoPatrimonio).pipe(operators_1.take(1));
    };
    PatrimonioService.prototype.obterEmpresaPadrao = function () {
        return this.api.get(environment_1.environment.apiUrl + "empresas/empresaPadrao", { responseType: 'text' }).pipe(operators_1.take(1));
    };
    PatrimonioService.prototype.atualizarPatrimonio = function (patrimonio, informacaoAdicional) {
        return this.api
            .put(this.baseUrl + "/" + patrimonio.codigoPatrimonio, { patrimonio: patrimonio, informacaoAdicional: informacaoAdicional })
            .pipe(operators_1.take(1));
    };
    PatrimonioService.prototype.obterPatrimonioEInformacaoAdicional = function (codigoPatrimonio) {
        var respostaPatrimonio = this.obterApenasUmPatrimonio(codigoPatrimonio);
        var respostaInformacaoAdicional = this.obterInformacaoAdicional(codigoPatrimonio);
        var respostaEmpresaPadrao = this.obterEmpresaPadrao();
        return rxjs_1.forkJoin([respostaPatrimonio, respostaInformacaoAdicional, respostaEmpresaPadrao]);
    };
    PatrimonioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PatrimonioService);
    return PatrimonioService;
}());
exports.PatrimonioService = PatrimonioService;
