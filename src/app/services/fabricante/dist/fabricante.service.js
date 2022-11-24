"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FabricanteService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var FabricanteService = /** @class */ (function () {
    function FabricanteService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "fabricantes";
    }
    FabricanteService.prototype.cadastrarFabricante = function (fabricante) {
        return this.api.post(this.baseUrl, { fabricante: fabricante }).pipe(operators_1.take(1));
    };
    FabricanteService.prototype.obterTodosFabricante = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    FabricanteService.prototype.deletarFabricante = function (codigoFabricante) {
        return this.api["delete"](this.baseUrl + "/" + codigoFabricante)
            .pipe(operators_1.take(1));
    };
    FabricanteService.prototype.obterApenasUmFabricante = function (codigoFabricante) {
        return this.api.get(this.baseUrl + "/" + codigoFabricante).pipe(operators_1.take(1));
        ;
    };
    FabricanteService.prototype.atualizarFabricante = function (fabricante) {
        return this.api
            .put(this.baseUrl + "/" + fabricante.codigoFabricante, { fabricante: fabricante })
            .pipe(operators_1.take(1));
    };
    FabricanteService = __decorate([
        core_1.Injectable()
    ], FabricanteService);
    return FabricanteService;
}());
exports.FabricanteService = FabricanteService;
