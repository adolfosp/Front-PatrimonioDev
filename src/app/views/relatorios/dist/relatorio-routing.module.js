"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RelatorioRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var relatorio_perda_component_1 = require("./relatorio-perda/relatorio-perda.component");
var routes = [
    {
        path: '',
        canActivate: [auth_guard_1.AuthGuard],
        component: relatorio_perda_component_1.RelatorioPerdaComponent,
        data: {
            title: 'relatorio-perda'
        }
    }
];
var RelatorioRoutingModule = /** @class */ (function () {
    function RelatorioRoutingModule() {
    }
    RelatorioRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], RelatorioRoutingModule);
    return RelatorioRoutingModule;
}());
exports.RelatorioRoutingModule = RelatorioRoutingModule;
