"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FabricanteRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var fabricante_component_1 = require("./fabricante.component");
var listagem_fabricante_component_1 = require("./listagem-fabricante/listagem-fabricante.component");
var routes = [
    {
        path: '',
        canActivate: [auth_guard_1.AuthGuard],
        component: fabricante_component_1.FabricanteComponent,
        data: {
            title: 'Fabricante'
        }
    },
    {
        path: 'listagem',
        canActivate: [auth_guard_1.AuthGuard],
        component: listagem_fabricante_component_1.ListagemFabricanteComponent,
        data: {
            title: 'listagem'
        }
    },
    {
        path: ':codigoFabricante',
        canActivate: [auth_guard_1.AuthGuard],
        component: fabricante_component_1.FabricanteComponent,
        data: {
            title: 'Fabricante'
        }
    }
];
var FabricanteRoutingModule = /** @class */ (function () {
    function FabricanteRoutingModule() {
    }
    FabricanteRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], FabricanteRoutingModule);
    return FabricanteRoutingModule;
}());
exports.FabricanteRoutingModule = FabricanteRoutingModule;
