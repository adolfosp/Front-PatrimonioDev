"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissaoRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var permissao_enum_1 = require("@nvs-enum/permissao.enum");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var role_guard_1 = require("@nvs-guards/role.guard");
var listagem_permissao_component_1 = require("./listagem-permissao/listagem-permissao.component");
var permissao_component_1 = require("./permissao.component");
var routes = [
    {
        path: '',
        component: permissao_component_1.PermissaoComponent,
        canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard],
        data: {
            title: 'Permissao',
            permissaoEsperada: [permissao_enum_1.Permissao.Administrador, permissao_enum_1.Permissao.Gestor]
        }
    },
    {
        path: 'listagem',
        component: listagem_permissao_component_1.ListagemPermissaoComponent,
        canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard],
        data: {
            title: 'listagem-permissao',
            permissaoEsperada: [permissao_enum_1.Permissao.Administrador, permissao_enum_1.Permissao.Gestor]
        }
    },
    {
        path: ':codigoPermissao',
        component: permissao_component_1.PermissaoComponent,
        canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard],
        data: {
            title: 'Permissao',
            permissaoEsperada: [permissao_enum_1.Permissao.Administrador, permissao_enum_1.Permissao.Gestor]
        }
    }
];
var PermissaoRoutingModule = /** @class */ (function () {
    function PermissaoRoutingModule() {
    }
    PermissaoRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], PermissaoRoutingModule);
    return PermissaoRoutingModule;
}());
exports.PermissaoRoutingModule = PermissaoRoutingModule;
