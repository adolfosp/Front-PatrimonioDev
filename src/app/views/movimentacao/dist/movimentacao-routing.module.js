"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MovimentacaoRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var listagem_movimentacao_component_1 = require("./listagem-movimentacao/listagem-movimentacao.component");
var movimentacao_component_1 = require("./movimentacao.component");
var routes = [
    {
        path: '',
        canActivate: [auth_guard_1.AuthGuard],
        component: movimentacao_component_1.MovimentacaoComponent,
        data: {
            title: 'movimentacao'
        }
    },
    {
        path: 'listagem',
        canActivate: [auth_guard_1.AuthGuard],
        component: listagem_movimentacao_component_1.ListagemMovimentacaoComponent,
        data: {
            title: 'listagem-movimentacao'
        }
    },
];
var MovimentacaoRoutingModule = /** @class */ (function () {
    function MovimentacaoRoutingModule() {
    }
    MovimentacaoRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], MovimentacaoRoutingModule);
    return MovimentacaoRoutingModule;
}());
exports.MovimentacaoRoutingModule = MovimentacaoRoutingModule;
