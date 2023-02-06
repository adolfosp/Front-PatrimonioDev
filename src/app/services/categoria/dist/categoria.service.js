"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriaService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var CategoriaService = /** @class */ (function () {
    function CategoriaService(api) {
        this.api = api;
        this.baseUrl = environment_1.environment.apiUrl + "categorias";
    }
    CategoriaService.prototype.cadastrarCategoria = function (categoria) {
        return this.api.post(this.baseUrl, { categoria: categoria }).pipe(operators_1.take(1));
    };
    CategoriaService.prototype.obterTodasCategorias = function () {
        return this.api.get(this.baseUrl).pipe(operators_1.take(1));
    };
    CategoriaService.prototype.deletarCategoria = function (codigoCategoria) {
        return this.api["delete"](this.baseUrl + "/" + codigoCategoria)
            .pipe(operators_1.take(1));
    };
    CategoriaService.prototype.obterApenasUmaCategoria = function (codigoCategoria) {
        return this.api.get(this.baseUrl + "/" + codigoCategoria).pipe(operators_1.take(1));
    };
    CategoriaService.prototype.atualizarCategoria = function (categoria) {
        return this.api
            .put(this.baseUrl + "/" + categoria.codigoCategoria, { categoria: categoria })
            .pipe(operators_1.take(1));
    };
    CategoriaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CategoriaService);
    return CategoriaService;
}());
exports.CategoriaService = CategoriaService;
