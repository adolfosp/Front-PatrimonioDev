"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissaoService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var PermissaoService = /** @class */ (function () {
    function PermissaoService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "permissoes";
    }
    PermissaoService.prototype.obterPermissoes = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    PermissaoService.prototype.cadastrarPermissao = function (usuarioPermissao) {
        debugger;
        return this.api
            .post(this.baseUrl, { perfilDto: usuarioPermissao })
            .pipe(operators_1.take(1));
    };
    PermissaoService.prototype.desativarPermissao = function (permissaoId) {
        return this.api["delete"](this.baseUrl + "/" + permissaoId)
            .pipe(operators_1.take(1));
    };
    PermissaoService.prototype.obterApenasUmaPermissao = function (permissaoId) {
        return this.api
            .get(this.baseUrl + "/" + permissaoId)
            .pipe(operators_1.take(1));
    };
    PermissaoService.prototype.atualizarPermissao = function (usuarioPermissao) {
        debugger;
        return this.api
            .put(this.baseUrl + "/" + usuarioPermissao.codigoPerfil, { usuarioPermissao: usuarioPermissao })
            .pipe(operators_1.take(1));
    };
    PermissaoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PermissaoService);
    return PermissaoService;
}());
exports.PermissaoService = PermissaoService;
