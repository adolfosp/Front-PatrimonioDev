"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenService = void 0;
var core_1 = require("@angular/core");
var local_storage_chave_enum_1 = require("@nvs-enum//local-storage-chave.enum");
var permissao_enum_1 = require("@nvs-enum/permissao.enum");
var jwt_decode_1 = require("jwt-decode");
var TokenService = /** @class */ (function () {
    function TokenService(encriptar, jwtHelper, localStorageService) {
        this.encriptar = encriptar;
        this.jwtHelper = jwtHelper;
        this.localStorageService = localStorageService;
        this.nomeCampoPermissao = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    }
    TokenService.prototype.obterTokenDescriptografado = function () {
        return this.retornarTokenTratado();
    };
    TokenService.prototype.retornarTokenTratado = function () {
        var token = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
        if (typeof token == 'undefined' || token == null)
            return '';
        debugger;
        return this.encriptar.decrypt(token);
    };
    TokenService.prototype.obterPermissaoToken = function () {
        var token = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
        //@ts-ignore
        return +jwt_decode_1["default"](this.encriptar.decrypt(token))[this.nomeCampoPermissao];
    };
    TokenService.prototype.obterNomeUsuarioToken = function () {
        var token = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
        //@ts-ignore
        return jwt_decode_1["default"](this.encriptar.decrypt(token))['nomeUsuario'];
    };
    TokenService.prototype.obterDescricaoPerfil = function () {
        var token = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
        //@ts-ignore
        return jwt_decode_1["default"](this.encriptar.decrypt(token))['descricaoPerfil'];
    };
    TokenService.prototype.obterCodigoUsuarioToken = function () {
        var token = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
        //@ts-ignore
        return +jwt_decode_1["default"](this.encriptar.decrypt(token))['codigoUsuario'];
    };
    TokenService.prototype.ehUsuarioAdministrador = function () {
        var permissaoAdministrador = permissao_enum_1.Permissao.Administrador;
        return +this.obterPermissaoToken() == permissaoAdministrador;
    };
    TokenService.prototype.usuarioEstaAutenticado = function () {
        var token = this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
        if (token == null)
            return false;
        return !this.jwtHelper.isTokenExpired(this.encriptar.decrypt(token));
    };
    TokenService.prototype.removerToken = function () {
        this.localStorageService.removerChave(local_storage_chave_enum_1.LocalStorageChave.Valor);
    };
    TokenService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TokenService);
    return TokenService;
}());
exports.TokenService = TokenService;
