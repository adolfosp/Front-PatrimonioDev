"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HttpCodeMensagemComponent = void 0;
var core_1 = require("@angular/core");
var DarkModeImagemHelper_1 = require("@nvs-helpers/DarkModeImagemHelper");
var ModoDarkLightHelper_1 = require("@nvs-helpers/ModoDarkLightHelper");
var HttpCodeMensagemComponent = /** @class */ (function () {
    function HttpCodeMensagemComponent(token, router, toaster) {
        this.token = token;
        this.router = router;
        this.toaster = toaster;
    }
    HttpCodeMensagemComponent.prototype.ngOnInit = function () {
        ModoDarkLightHelper_1.atribuirTemaCorretoAoRecarregarPagina();
        this.atribuirImagemDeAcordoComOModo();
    };
    HttpCodeMensagemComponent.prototype.atribuirImagemDeAcordoComOModo = function () {
        debugger;
        var darkMode = new DarkModeImagemHelper_1.DarkModeImagemHelper(this.caminhoImagemDark, this.caminhoImagemLight, "imagem-erro-http");
        darkMode.alternarImagemDeAcordoComOModo();
    };
    HttpCodeMensagemComponent.prototype.validarSeTokenExpirado = function () {
        if (this.token.usuarioEstaAutenticado()) {
            this.router.navigate(['/dashboard']);
        }
        else {
            this.toaster.info('Seu acesso foi expirado e por isso será necessário fazer o login novamente.', 'Acesso Expirado');
            this.router.navigate(['login']);
        }
    };
    __decorate([
        core_1.Input()
    ], HttpCodeMensagemComponent.prototype, "caminhoImagemDark");
    __decorate([
        core_1.Input()
    ], HttpCodeMensagemComponent.prototype, "caminhoImagemLight");
    __decorate([
        core_1.Input()
    ], HttpCodeMensagemComponent.prototype, "mensagemErro");
    HttpCodeMensagemComponent = __decorate([
        core_1.Component({
            selector: 'app-http-code-mensagem',
            templateUrl: './http-code-mensagem.component.html',
            styleUrls: ['./http-code-mensagem.component.sass']
        })
    ], HttpCodeMensagemComponent);
    return HttpCodeMensagemComponent;
}());
exports.HttpCodeMensagemComponent = HttpCodeMensagemComponent;
