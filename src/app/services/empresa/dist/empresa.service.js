"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmpresaService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var EmpresaService = /** @class */ (function () {
    function EmpresaService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "empresas";
    }
    EmpresaService.prototype.obterEmpresas = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    EmpresaService.prototype.cadastrarEmpresa = function (empresa) {
        return this.api.post(this.baseUrl, { empresa: empresa }).pipe(operators_1.take(1));
    };
    EmpresaService.prototype.obterEmpresaPadrao = function () {
        return this.api.get(this.baseUrl + "/empresaPadrao").pipe(operators_1.take(1));
    };
    EmpresaService.prototype.deletarEmpresa = function (codigoEmpresa) {
        return this.api["delete"](this.baseUrl + "/" + codigoEmpresa)
            .pipe(operators_1.take(1));
    };
    EmpresaService.prototype.obterApenasUmaEmpresa = function (codigoEmpresa) {
        return this.api.get(this.baseUrl + "/" + codigoEmpresa).pipe(operators_1.take(1));
    };
    EmpresaService.prototype.atualizarEmpresa = function (empresa) {
        return this.api
            .put(this.baseUrl + "/" + empresa.codigoEmpresa, { empresa: empresa })
            .pipe(operators_1.take(1));
    };
    EmpresaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EmpresaService);
    return EmpresaService;
}());
exports.EmpresaService = EmpresaService;
