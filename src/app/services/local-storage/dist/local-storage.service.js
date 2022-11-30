"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocalStorageService = void 0;
var core_1 = require("@angular/core");
var local_storage_chave_enum_1 = require("@nvs-enum/local-storage-chave.enum");
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.adicionarChave = function (indexChave, valor) {
        localStorage.setItem(local_storage_chave_enum_1.LocalStorageChave[indexChave], valor);
    };
    LocalStorageService.prototype.removerChave = function (indexChave) {
        localStorage.removeItem(local_storage_chave_enum_1.LocalStorageChave[indexChave]);
    };
    LocalStorageService.prototype.obterChave = function (indexChave) {
        return this.tratarValorLocalStorage(localStorage.getItem(local_storage_chave_enum_1.LocalStorageChave[indexChave]) || '');
    };
    LocalStorageService.prototype.tratarValorLocalStorage = function (valor) {
        if (typeof valor == 'undefined') {
            return '';
        }
        return valor;
    };
    LocalStorageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
