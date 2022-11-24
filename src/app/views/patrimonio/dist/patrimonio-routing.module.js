"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PatrimonioRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var listagem_patrimonio_component_1 = require("./listagem-patrimonio/listagem-patrimonio.component");
var patrimonio_component_1 = require("./patrimonio.component");
var routes = [
    {
        path: '',
        component: patrimonio_component_1.PatrimonioComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            title: 'patrimonio'
        }
    },
    {
        path: 'patrimonio/:codigoPatrimonio',
        component: patrimonio_component_1.PatrimonioComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            title: 'patrimonio'
        }
    },
    {
        path: 'listagem',
        component: listagem_patrimonio_component_1.ListagemPatrimonioComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            title: 'listagem'
        }
    }
];
var PatrimonioRoutingModule = /** @class */ (function () {
    function PatrimonioRoutingModule() {
    }
    PatrimonioRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], PatrimonioRoutingModule);
    return PatrimonioRoutingModule;
}());
exports.PatrimonioRoutingModule = PatrimonioRoutingModule;
