"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmpresaRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var categoria_component_1 = require("./categoria.component");
var listagem_categoria_component_1 = require("./listagem-categoria/listagem-categoria.component");
var routes = [
    {
        path: 'categoria',
        canActivate: [auth_guard_1.AuthGuard],
        component: categoria_component_1.CategoriaComponent,
        data: {
            title: 'categoria'
        }
    },
    {
        path: 'categoria/:codigoCategoria',
        canActivate: [auth_guard_1.AuthGuard],
        component: categoria_component_1.CategoriaComponent,
        data: {
            title: 'categoria'
        }
    },
    {
        path: 'listagem-categoria',
        canActivate: [auth_guard_1.AuthGuard],
        component: listagem_categoria_component_1.ListagemCategoriaComponent,
        data: {
            title: 'listagem-categoria'
        }
    },
];
var EmpresaRoutingModule = /** @class */ (function () {
    function EmpresaRoutingModule() {
    }
    EmpresaRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], EmpresaRoutingModule);
    return EmpresaRoutingModule;
}());
exports.EmpresaRoutingModule = EmpresaRoutingModule;
