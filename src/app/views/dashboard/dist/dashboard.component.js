"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(token, router, authService) {
        this.token = token;
        this.router = router;
        this.authService = authService;
        // this.authService.authState.subscribe((user) => {
        //   debugger;
        //   this.estaLogadoAuth = (user != null);
        // });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.carregarArquivoJs("assets/js/app.js");
        this.nomeUsuario = this.token.obterNomeUsuarioToken();
        this.descricaoPerfil = this.token.obterDescricaoPerfil();
    };
    DashboardComponent.prototype.carregarArquivoJs = function (url) {
        var node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    DashboardComponent.prototype.signOutAuth = function () {
        if (this.estaLogadoAuth)
            this.authService.signOut(true);
    };
    DashboardComponent.prototype.logOut = function () {
        this.signOutAuth();
        this.token.removerToken();
        this.router.navigate(['login']);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.sass']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
