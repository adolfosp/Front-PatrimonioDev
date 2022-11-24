"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FuncionarioRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var funcionario_component_1 = require("./funcionario.component");
var listagem_funcionario_component_1 = require("./listagem-funcionario/listagem-funcionario.component");
var routes = [
    {
        path: '',
        canActivate: [auth_guard_1.AuthGuard],
        component: funcionario_component_1.FuncionarioComponent,
        data: {
            title: 'Funcionário'
        }
    },
    {
        path: 'listagem',
        canActivate: [auth_guard_1.AuthGuard],
        component: listagem_funcionario_component_1.ListagemFuncionarioComponent,
        data: {
            title: 'listagem'
        }
    },
    {
        path: ':codigoFuncionario',
        canActivate: [auth_guard_1.AuthGuard],
        component: funcionario_component_1.FuncionarioComponent,
        data: {
            title: 'Funcionário'
        }
    }
];
var FuncionarioRoutingModule = /** @class */ (function () {
    function FuncionarioRoutingModule() {
    }
    FuncionarioRoutingModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], FuncionarioRoutingModule);
    return FuncionarioRoutingModule;
}());
exports.FuncionarioRoutingModule = FuncionarioRoutingModule;
