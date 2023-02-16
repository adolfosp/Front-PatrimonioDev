"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetorService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var SetorService = /** @class */ (function () {
    function SetorService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "setores";
    }
    SetorService.prototype.cadastrarSetor = function (setor) {
        return this.api
            .post(this.baseUrl, { setor: setor })
            .pipe(operators_1.take(1));
    };
    SetorService.prototype.obterSetor = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    SetorService.prototype.obterApenasUmSetor = function (codigoSetor) {
        return this.api.get(this.baseUrl + "/" + codigoSetor).pipe(operators_1.take(1));
    };
    SetorService.prototype.deletarSetor = function (setorId) {
        return this.api["delete"](this.baseUrl + "/" + setorId)
            .pipe(operators_1.take(1));
    };
    SetorService.prototype.atualizarSetor = function (setor) {
        return this.api
            .put(this.baseUrl + "/" + setor.codigoSetor, { setor: setor })
            .pipe(operators_1.take(1));
    };
    SetorService = __decorate([
        core_1.Injectable()
    ], SetorService);
    return SetorService;
}());
exports.SetorService = SetorService;
