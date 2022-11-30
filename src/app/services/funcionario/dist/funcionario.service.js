"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FuncionarioService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var FuncionarioService = /** @class */ (function () {
    function FuncionarioService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "funcionarios";
    }
    FuncionarioService.prototype.cadastrarFuncionario = function (funcionario) {
        return this.api.post(this.baseUrl, { funcionario: funcionario }).pipe(operators_1.take(1));
    };
    FuncionarioService.prototype.obterTodosFuncionarios = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    FuncionarioService.prototype.desativarFuncionario = function (codigoFuncionario) {
        return this.api["delete"](this.baseUrl + "/" + codigoFuncionario)
            .pipe(operators_1.take(1));
    };
    FuncionarioService.prototype.obterApenasUmFuncionario = function (codigoFuncionario) {
        return this.api.get(this.baseUrl + "/" + codigoFuncionario).pipe(operators_1.take(1));
    };
    FuncionarioService.prototype.atualizarFuncionario = function (funcionario) {
        return this.api
            .put(this.baseUrl + "/" + funcionario.codigoFuncionario, { funcionario: funcionario })
            .pipe(operators_1.take(1));
    };
    FuncionarioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FuncionarioService);
    return FuncionarioService;
}());
exports.FuncionarioService = FuncionarioService;
