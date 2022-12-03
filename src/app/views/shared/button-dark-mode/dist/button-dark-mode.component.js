"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ButtonDarkModeComponent = void 0;
var core_1 = require("@angular/core");
var local_storage_chave_enum_1 = require("@nvs-enum/local-storage-chave.enum");
var ModoDarkLightHelper_1 = require("@nvs-helpers/ModoDarkLightHelper");
var ButtonDarkModeComponent = /** @class */ (function () {
    function ButtonDarkModeComponent(localStorageService) {
        this.localStorageService = localStorageService;
    }
    ButtonDarkModeComponent.prototype.ngOnInit = function () {
        this.verificarEstadoAtualBotaoDarkMode();
        this.escutarAcaoBotaoDarkMode();
    };
    ButtonDarkModeComponent.prototype.verificarEstadoAtualBotaoDarkMode = function () {
        var botaoDarkMode = document.querySelector('.toggle-button');
        if (this.localStorageService.obterChave(local_storage_chave_enum_1.LocalStorageChave.DarkMode) == 'dark') {
            botaoDarkMode.setAttribute('checked', 'checked');
            ModoDarkLightHelper_1.mudarTema({ target: { checked: true } });
            return;
        }
        botaoDarkMode.removeAttribute('checked');
        ModoDarkLightHelper_1.mudarTema({ target: { checked: false } });
    };
    ButtonDarkModeComponent.prototype.escutarAcaoBotaoDarkMode = function () {
        var toggleSwitch = document.querySelector('.toggle-button');
        toggleSwitch.addEventListener('change', ModoDarkLightHelper_1.mudarTema, false);
    };
    ButtonDarkModeComponent = __decorate([
        core_1.Component({
            selector: 'app-button-dark-mode',
            templateUrl: './button-dark-mode.component.html',
            styleUrls: ['./button-dark-mode.component.sass']
        })
    ], ButtonDarkModeComponent);
    return ButtonDarkModeComponent;
}());
exports.ButtonDarkModeComponent = ButtonDarkModeComponent;
