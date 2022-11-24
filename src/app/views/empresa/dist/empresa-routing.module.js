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
var permissao_enum_1 = require("@nvs-enum/permissao.enum");
var auth_guard_1 = require("@nvs-guards/auth.guard");
var role_guard_1 = require("@nvs-guards/role.guard");
var empresa_component_1 = require("./empresa.component");
var listagem_empresa_component_1 = require("./listagem-empresa/listagem-empresa.component");
var routes = [
    {
        path: '',
        component: empresa_component_1.EmpresaComponent,
        canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard],
        data: {
            title: 'Empresa',
            permissaoEsperada: [permissao_enum_1.Permissao.Administrador]
        }
    },
    {
        path: 'listagem',
        component: listagem_empresa_component_1.ListagemEmpresaComponent,
        canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard],
        data: {
            title: 'listagem',
            permissaoEsperada: [permissao_enum_1.Permissao.Administrador]
        }
    },
    {
        path: ':codigoEmpresa',
        component: empresa_component_1.EmpresaComponent,
        canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard],
        data: {
            title: 'Empresa',
            permissaoEsperada: [permissao_enum_1.Permissao.Administrador]
        }
    }
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
