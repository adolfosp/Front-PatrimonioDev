"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EquipamentoRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var equipamento_component_1 = require("./equipamento.component");
var listagem_equipamento_component_1 = require("./listagem-equipamento/listagem-equipamento.component");
var routes = [
    {
        path: '',
        canActivate: [auth_guard_1.AuthGuard],
        component: equipamento_component_1.EquipamentoComponent,
        data: {
            title: 'equipamento'
        }
    },
    {
        path: 'listagem',
        canActivate: [auth_guard_1.AuthGuard],
        component: listagem_equipamento_component_1.ListagemEquipamentoComponent,
        data: {
            title: 'listagem'
        }
    },
    {
        path: ':codigoEquipamento',
        canActivate: [auth_guard_1.AuthGuard],
        component: equipamento_component_1.EquipamentoComponent,
        data: {
            title: 'equipamento'
        }
    }
];
var EquipamentoRoutingModule = /** @class */ (function () {
    function EquipamentoRoutingModule() {
    }
    EquipamentoRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], EquipamentoRoutingModule);
    return EquipamentoRoutingModule;
}());
exports.EquipamentoRoutingModule = EquipamentoRoutingModule;
