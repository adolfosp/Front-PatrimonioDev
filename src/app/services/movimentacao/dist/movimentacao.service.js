"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MovimentacaoService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var MovimentacaoService = /** @class */ (function () {
    function MovimentacaoService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "movimentacoes";
    }
    MovimentacaoService.prototype.realizarMovimentacao = function (movimentacao) {
        return this.api
            .post(this.baseUrl, { movimentacao: movimentacao })
            .pipe(operators_1.take(1));
    };
    MovimentacaoService.prototype.obterTodasMovimentacoesDoPatrimonio = function (codigoPatrimonio) {
        return this.api
            .get(this.baseUrl + "/movimentacao/" + codigoPatrimonio)
            .pipe(operators_1.take(1));
    };
    MovimentacaoService.prototype.atualizarMovimentacao = function (movimentacao) {
        return this.api
            .put(this.baseUrl + "/" + movimentacao.codigoMovimentacao, { movimentacao: movimentacao })
            .pipe(operators_1.take(1));
    };
    MovimentacaoService.prototype.obterApenasUmaMovimentacao = function (codigoMovimentacao) {
        return this.api.get(this.baseUrl + "/" + codigoMovimentacao).pipe(operators_1.take(1));
        ;
    };
    MovimentacaoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MovimentacaoService);
    return MovimentacaoService;
}());
exports.MovimentacaoService = MovimentacaoService;
