"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuarioPerfilService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var UsuarioPerfilService = /** @class */ (function () {
    function UsuarioPerfilService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "perfils";
    }
    UsuarioPerfilService.prototype.obterPerfilUsuario = function (codigoUsuario) {
        return this.api.get(this.baseUrl + "/" + codigoUsuario).pipe(operators_1.take(1));
    };
    UsuarioPerfilService.prototype.atualizarPerfilUsuario = function (perfil) {
        return this.api.put("" + this.baseUrl, { perfilDto: perfil });
    };
    UsuarioPerfilService.prototype.inserirImagem = function (codigoUsuario, file) {
        var arquivoUpload = file;
        var formData = new FormData();
        formData.append('file', arquivoUpload);
        return this.api.postImage(this.baseUrl + "/upload-imagem/" + codigoUsuario, formData);
    };
    UsuarioPerfilService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsuarioPerfilService);
    return UsuarioPerfilService;
}());
exports.UsuarioPerfilService = UsuarioPerfilService;
