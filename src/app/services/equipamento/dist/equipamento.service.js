"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EquipamentoService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var EquipamentoService = /** @class */ (function () {
    function EquipamentoService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "equipamentos";
    }
    EquipamentoService.prototype.cadastrarEquipamento = function (equipamento) {
        return this.api.post(this.baseUrl, { equipamento: equipamento }).pipe(operators_1.take(1));
    };
    EquipamentoService.prototype.obterTodosEquipamentos = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    EquipamentoService.prototype.deletarEquipamento = function (codigoEquipamento) {
        return this.api["delete"](this.baseUrl + "/" + codigoEquipamento)
            .pipe(operators_1.take(1));
    };
    EquipamentoService.prototype.obterApenasUmEquipamento = function (codigoEquipamento) {
        return this.api.get(this.baseUrl + "/" + codigoEquipamento).pipe(operators_1.take(1));
        ;
    };
    EquipamentoService.prototype.atualizarEquipamento = function (equipamento) {
        debugger;
        return this.api
            .put(this.baseUrl + "/" + equipamento.codigoTipoEquipamento, { equipamento: equipamento })
            .pipe(operators_1.take(1));
    };
    EquipamentoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EquipamentoService);
    return EquipamentoService;
}());
exports.EquipamentoService = EquipamentoService;
